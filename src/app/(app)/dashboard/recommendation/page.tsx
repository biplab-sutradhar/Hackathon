'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const specialChar = "||";

const parseStringMessages = (messageString: any) => {
  return messageString.split(specialChar).map((msg: string) => msg.trim());
};

const SuggestedMessages = () => {
  const [suggestedMessages, setSuggestedMessages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const defaultMessage = "It seems child like sweets too much || Child like cocomelon youtube channel || Child like edutcational content || Child should indulge in physical activities";

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post('/api/recommendation', {
          
          user_id: 1,
          preferences: ['health', 'motivation'],
        });

        console.log('Response Data:', response.data);

        setSuggestedMessages(response.data.generatedMessage || []);
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const messages = suggestedMessages.length > 0
    ? parseStringMessages(suggestedMessages)
    : parseStringMessages(defaultMessage);

  return (
    <Card className="w-full h-screen w-screen max-w-2xl mx-auto">
      <CardHeader className="border-b">
        <div className="flex items-center space-x-2">
          <MessageCircle className="w-5 h-5 text-primary" />
          <CardTitle className="text-lg font-medium">Recommended</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-pulse text-muted-foreground">Loading suggestions...</div>
          </div>
        ) : (
          <div className="grid gap-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors cursor-pointer"
              >
                <p className="text-sm text-foreground">{message}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SuggestedMessages;
