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
  Circle,
  Square,
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
  const [isRecording, setIsRecording] = useState(false)
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)

  useEffect(() => {
    startVideo()
    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

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

  const startRecording = () => {
    if (localStream && !isRecording) {
      const recorder = new MediaRecorder(localStream)
      const chunks: BlobPart[] = []

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data)
        }
      }

      recorder.onstop = () => {
        const recordedBlob = new Blob(chunks, { type: 'video/mp4' })
        const url = URL.createObjectURL(recordedBlob)
        const a = document.createElement('a')
        a.href = url
        a.download = `meeting-${meetingId}-${Date.now()}.mp4`
        a.click()
        setIsRecording(false)
      }

      recorder.start()
      setMediaRecorder(recorder)
      setIsRecording(true)
    }
  }

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop()
      setMediaRecorder(null)
    }
  }

  const leaveMeeting = () => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop())
    }
    router.push('/')
  }

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
            
            <button
              onClick={isRecording ? stopRecording : startRecording}
              className={`control-button ${isRecording ? 'bg-red-500 text-white' : ''}`}
            >
              {isRecording ? <Square size={20} /> : <Circle size={20} />}
              {isRecording ? 'Stop Recording' : 'Start Recording'}
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
            >
              <LogOut size={20} />
              Leave Meeting
            </button>
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-gray-400 text-sm">TEAM ANONYMOUS</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}