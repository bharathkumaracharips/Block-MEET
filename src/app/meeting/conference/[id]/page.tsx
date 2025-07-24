'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams, useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  MessageCircle,
  LogOut
} from 'lucide-react'

export default function ConferencePage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)
  
  const meetingId = params.id as string
  const isAdmin = searchParams.get('admin') === 'true'
  
  const [localStream, setLocalStream] = useState<MediaStream | null>(null)
  const [isVideoEnabled, setIsVideoEnabled] = useState(true)
  const [isAudioEnabled, setIsAudioEnabled] = useState(true)
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null)
  const [uploading, setUploading] = useState(false)
  const [ipfsUrl, setIpfsUrl] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null);
  // Add a state to track if the user wants to leave
  const [pendingLeave, setPendingLeave] = useState(false);

  useEffect(() => {
    startVideo()
    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  // Start recording automatically when video stream is ready
  useEffect(() => {
    if (localStream && !mediaRecorder) {
      const recorder = new window.MediaRecorder(localStream)
      const chunks: BlobPart[] = []
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data)
        }
      }
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/mp4' })
        setRecordedBlob(blob)
      }
      recorder.start()
      setMediaRecorder(recorder)
    }
  }, [localStream])

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      })
      setLocalStream(stream)
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream
      }
    } catch (error) {
      console.error('Error accessing media devices:', error)
    }
  }

  const toggleVideo = () => {
    if (localStream) {
      const videoTracks = localStream.getVideoTracks()
      if (videoTracks.length > 0) {
        videoTracks[0].enabled = !isVideoEnabled
        setIsVideoEnabled(!isVideoEnabled)
      }
    }
  }

  const toggleAudio = () => {
    if (localStream) {
      const audioTracks = localStream.getAudioTracks()
      if (audioTracks.length > 0) {
        audioTracks[0].enabled = !isAudioEnabled
        setIsAudioEnabled(!isAudioEnabled)
      }
    }
  }

  // Upload to IPFS and show modal on leave
  const leaveMeeting = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      setPendingLeave(true);
      mediaRecorder.stop();
      setMediaRecorder(null);
    } else {
      // If already stopped, just upload
      uploadRecording();
    }
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }
  };

  useEffect(() => {
    if (pendingLeave && recordedBlob) {
      uploadRecording();
      setPendingLeave(false);
    }
  }, [pendingLeave, recordedBlob]);

  const uploadRecording = async () => {
    if (recordedBlob) {
      setUploading(true);
      setIpfsUrl(null);
      setUploadError(null);
      try {
        const formData = new FormData();
        formData.append('file', recordedBlob, `meeting-${meetingId}-${Date.now()}.mp4`);
        const response = await fetch('http://localhost:3001/upload', {
          method: 'POST',
          body: formData,
          // mode: 'cors', // Uncomment if you run into CORS issues
        });
        const data = await response.json();
        console.log('Upload response:', data); // Debugging: see what the backend returns
        if (data && data.gatewayUrl) {
          setIpfsUrl(data.gatewayUrl);
          setShowModal(true);
        } else if (data && data.error) {
          setIpfsUrl(null);
          setUploadError(data.error || 'Unknown error');
          setShowModal(true);
        } else {
          setIpfsUrl(null);
          setUploadError('Unexpected response from server.');
          setShowModal(true);
        }
      } catch (err) {
        setIpfsUrl(null);
        if (err instanceof TypeError && err.message.includes('fetch')) {
          setUploadError('Network error: Could not reach upload server.');
        } else {
          setUploadError((err as Error).message);
        }
        setShowModal(true);
      } finally {
        setUploading(false);
      }
    } else {
      setUploadError('No recording found.');
      setShowModal(true);
    }
  };

  // Download from IPFS link
  const handleDownload = async () => {
    if (!ipfsUrl) return;
    try {
      const response = await fetch(ipfsUrl);
      const arrayBuffer = await response.arrayBuffer();
      // Always create the blob as video/mp4
      const mp4Blob = new Blob([arrayBuffer], { type: 'video/mp4' });
      const url = window.URL.createObjectURL(mp4Blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `meeting-${meetingId}.mp4`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert('Failed to download from IPFS');
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl font-bold text-white text-center mb-8">
            Meeting: {meetingId}
          </h1>
          {/* Video Container */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-64 lg:h-80 object-cover"
              />
              <div className="p-4">
                <p className="text-white font-medium">You</p>
              </div>
            </div>
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="w-full h-64 lg:h-80 object-cover bg-gray-800"
              />
              <div className="p-4">
                <p className="text-white font-medium">Remote Participant</p>
              </div>
            </div>
          </div>
          {/* Controls */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={toggleVideo}
              className={`control-button ${!isVideoEnabled ? 'bg-red-500 text-white' : ''}`}
            >
              {isVideoEnabled ? <Video size={20} /> : <VideoOff size={20} />}
              {isVideoEnabled ? 'Stop Video' : 'Start Video'}
            </button>
            <button
              onClick={toggleAudio}
              className={`control-button ${!isAudioEnabled ? 'bg-red-500 text-white' : ''}`}
            >
              {isAudioEnabled ? <Mic size={20} /> : <MicOff size={20} />}
              {isAudioEnabled ? 'Mute' : 'Unmute'}
            </button>
            <Link href="/meeting/chat">
              <button className="control-button">
                <MessageCircle size={20} />
                Chat
              </button>
            </Link>
          </div>
          {/* IPFS Link */}
          <div className="text-center mb-8">
            <Link 
              href="http://localhost:3000" 
              className="text-blue-400 hover:text-blue-300 transition-colors"
              target="_blank"
            >
              Access IPFS Storage
            </Link>
          </div>
          {/* Leave Meeting */}
          <div className="text-center">
            <button
              onClick={leaveMeeting}
              className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200 flex items-center gap-2 mx-auto"
              disabled={uploading}
            >
              <LogOut size={20} />
              {uploading ? 'Uploading...' : 'Leave Meeting'}
            </button>
          </div>
          {/* Modal for IPFS link and download */}
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
              <div className="bg-gray-900 p-8 rounded-lg text-center">
                {ipfsUrl ? (
                  <>
                    <h2 className="text-xl font-bold text-white mb-4">Meeting Video Uploaded</h2>
                    <a href={ipfsUrl} className="text-green-400 hover:text-green-300 transition-colors break-all" target="_blank" rel="noopener noreferrer">
                      {ipfsUrl}
                    </a>
                    <div className="mt-6">
                      <p className="text-white mb-2">Do you want to save the meeting video locally?</p>
                      <button onClick={handleDownload} className="btn-primary mr-4">Download</button>
                      <button onClick={() => { setShowModal(false); router.push('/') }} className="btn-secondary">No, just close</button>
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="text-xl font-bold text-red-400 mb-4">Upload Failed</h2>
                    <p className="text-white mb-4">{uploadError || 'Unknown error occurred.'}</p>
                    <div className="mt-6">
                      <button onClick={leaveMeeting} className="btn-primary mr-4">Retry Upload</button>
                      <button onClick={() => { setShowModal(false); router.push('/') }} className="btn-secondary">Exit</button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
          <div className="mt-16 text-center">
            <p className="text-gray-400 text-sm">TEAM ANONYMOUS</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}