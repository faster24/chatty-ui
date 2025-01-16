'use client'

import { useState, useRef, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { ArrowLeft, Camera, Send, Smile } from 'lucide-react'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import StickerIcon from '@/icons/StickerIcon'
import SendIcon from '@/icons/SendIcon'
import { Search } from 'lucide-react'
// import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@/icons/popover'
// interface Message {
//   id: string
//   content: string
//   senderId: string
//   timestamp: Date
// }

// interface ChatUser {
//   id: string
//   name: string
//   role: string
//   isOnline: boolean
// }

// In a real app, this would come from your backend
const mockMessages = [
  {
    id: '1',
    content: 'Potter ipsum wand elf parchment wingardium. Emporium spells not side or.',
    senderId: 'user1',
    timestamp: new Date('2024-01-09T20:15:00'),
  },
  {
    id: '2',
    content: 'Potter ipsum wand elf parchment wingardium. Emporium spells not side or.',
    senderId: 'current-user',
    timestamp: new Date('2024-01-09T20:16:00'),
  },
  {
    id: '3',
    content: 'Potter ipsum wand elf parchment wingardium. Emporium spells not side or.',
    senderId: 'current-user',
    timestamp: new Date('2024-01-09T20:17:00'),
  },
  {
    id: '4',
    content: 'Potter ipsum wand elf parchment wingardium. Emporium spells not side or.',
    senderId: 'user1',
    timestamp: new Date('2024-01-09T20:18:00'),
  },
  {
    id: '5',
    content: 'Potter ipsum wand elf parchment wingardium. Emporium spells not side or.',
    senderId: 'user1',
    timestamp: new Date('2024-01-09T20:19:00'),
  },
  {
    id: '6',
    content: 'Potter ipsum wand elf parchment wingardium. Emporium spells not side or.',
    senderId: 'current-user',
    timestamp: new Date('2024-01-09T20:20:00'),
  },
  {
    id: '11',
    content: 'Potter ipsum wand elf parchment wingardium. Emporium spells not side or.',
    senderId: 'user1',
    timestamp: new Date('2024-01-09T20:15:00'),
  }]
//   {
//     id: '12',
//     content: 'Potter ipsum wand elf parchment wingardium. Emporium spells not side or.',
//     senderId: 'current-user',
//     timestamp: new Date('2024-01-09T20:16:00'),
//   },
//   {
//     id: '13',
//     content: 'Potter ipsum wand elf parchment wingardium. Emporium spells not side or.',
//     senderId: 'current-user',
//     timestamp: new Date('2024-01-09T20:17:00'),
//   },
//   {
//     id: '14',
//     content: 'Potter ipsum wand elf parchment wingardium. Emporium spells not side or.',
//     senderId: 'user1',
//     timestamp: new Date('2024-01-09T20:18:00'),
//   },
//   {
//     id: '15',
//     content: 'Potter ipsum wand elf parchment wingardium. Emporium spells not side or.',
//     senderId: 'user1',
//     timestamp: new Date('2024-01-09T20:19:00'),
//   },
//   {
//     id: '16',
//     content: 'Potter ipsum wand elf parchment wingardium. Emporium spells not side or.',
//     senderId: 'current-user',
//     timestamp: new Date('2024-01-09T20:20:00'),
//   },

export default function ChatConversation() {
  const stickerRef = useRef(null);
  const closeStickerrRef = useRef(null);
  const navigate = useNavigate()
  const { userId } = useParams()
  const [newMessage, setNewMessage] = useState('')
  const [messages, setMessages] = useState(mockMessages)
  const scrollAreaRef = useRef(null)
  const bottomRef = useRef(null)

  // In a real app, fetch this from your backend
  const chatUser = {
    id: userId || '',
    name: 'David',
    role: 'Admin',
    isOnline: true,
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const message = {
      id: Date.now().toString(),
      content: newMessage,
      senderId: 'current-user',
      timestamp: new Date(),
    }

    setMessages([...messages, message])
    setNewMessage('')
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className={`flex flex-col h-screen max-w-md mx-auto bg-white`}>
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => navigate('/chat')}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="h-12 w-12">
              <AvatarFallback>{chatUser.name[0]}</AvatarFallback>
            </Avatar>
            {chatUser.isOnline && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
            )}
          </div>
          <div>
            <h2 className="font-semibold text-lg">{chatUser.name}</h2>
            <p className="text-sm text-muted-foreground">{chatUser.role}</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1" ref={scrollAreaRef}>
        <div className="flex flex-col p-4 min-h-full">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.senderId === 'current-user' ? 'justify-end' : 'justify-start'
                } mb-4`}
            >
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-2 ${message.senderId === 'current-user'
                    ? 'bg-black text-white'
                    : 'bg-gray-100'
                  }`}
              >
                <p>{message.content}</p>
                <p className="text-xs mt-1 opacity-70">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: 'numeric',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      {/* Message Input */}
      <>
        <form onSubmit={handleSendMessage} className="p-4 border-t">
          <div className="flex items-center gap-2">
            <Button type="button" variant="ghost" size="icon" className="rounded-full">
              <Camera className="h-6 w-6" />
            </Button>
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Message..."
              className="rounded-full"
            />
            <Button type="button" variant="none" size="icon" className="rounded-full bg-none">
              <StickerIcon
                width="100"
                height="100"
                onClick={() => {
                  stickerRef.current?.click();
                }}
              />
            </Button>
            <Button type="submit" size="icon" variant="none" className="rounded-full hover:bg-none">
              <SendIcon />
            </Button>
          </div>
        </form>
      </>
    </div>
  )
}

