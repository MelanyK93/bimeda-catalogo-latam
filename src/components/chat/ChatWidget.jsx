import React, { useState, useEffect, useRef } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import MessageBubble from "./MessageBubble";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (isOpen && !conversation) {
      initializeChat();
    }
  }, [isOpen]);

  useEffect(() => {
    if (conversation) {
      const unsubscribe = base44.agents.subscribeToConversation(conversation.id, (data) => {
        setMessages(data.messages || []);
        setTimeout(() => {
          if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
          }
        }, 100);
      });

      return () => unsubscribe();
    }
  }, [conversation]);

  const initializeChat = async () => {
    setIsLoading(true);
    const conv = await base44.agents.createConversation({
      agent_name: "asistente_productos",
      metadata: {
        name: "Asistencia de Productos",
        description: "Conversación con el asistente virtual de Bimeda"
      }
    });
    setConversation(conv);
    
    await base44.agents.addMessage(conv, {
      role: "user",
      content: "Hola, soy el asistente virtual de Bimeda. ¿En qué puedo ayudarte hoy?"
    });
    
    setIsLoading(false);
  };

  const handleSend = async () => {
    if (!input.trim() || !conversation || isLoading) return;

    const userMessage = input;
    setInput("");
    setIsLoading(true);

    await base44.agents.addMessage(conversation, {
      role: "user",
      content: userMessage
    });

    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="h-14 w-14 rounded-full shadow-2xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)]"
          >
            <Card className="shadow-2xl border-2 border-slate-200 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4 border-b-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img 
                      src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/691343752dd769d27639030b/956eafb9a_Bimeda_Logo_white-text.png"
                      alt="Bimeda"
                      className="h-8 object-contain"
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="hover:bg-white/20 text-white"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <p className="text-xs text-red-100 mt-2">Asistente Virtual • En línea</p>
              </CardHeader>

              <CardContent className="p-0">
                {/* Messages */}
                <ScrollArea className="h-96 p-4 bg-slate-50" ref={scrollRef}>
                  <div className="space-y-4">
                    {messages.length === 0 && !isLoading && (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <MessageCircle className="w-8 h-8 text-red-600" />
                        </div>
                        <p className="text-slate-600 font-medium mb-1">¡Hola! Soy tu asistente virtual</p>
                        <p className="text-sm text-slate-500">Pregúntame sobre productos Bimeda</p>
                      </div>
                    )}
                    
                    {messages.map((message, idx) => (
                      <MessageBubble key={idx} message={message} />
                    ))}

                    {isLoading && messages.length > 0 && (
                      <div className="flex gap-3">
                        <div className="h-7 w-7 rounded-lg bg-red-100 flex items-center justify-center mt-0.5">
                          <Loader2 className="h-4 w-4 text-red-600 animate-spin" />
                        </div>
                        <div className="bg-white border border-slate-200 rounded-2xl px-4 py-2.5">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                {/* Input */}
                <div className="p-4 bg-white border-t border-slate-200">
                  <div className="flex gap-2">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Escribe tu pregunta..."
                      disabled={isLoading}
                      className="flex-1"
                    />
                    <Button
                      onClick={handleSend}
                      disabled={!input.trim() || isLoading}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    Pregunta sobre especies, categorías o productos específicos
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}