"use client";
import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, PlayCircle, ChevronRight } from 'lucide-react';

const page = () => {
  return (
    <>
      <div className="min-h-screen bg-white">
        <nav className="flex items-center justify-between px-6 py-4 border-b">
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <Wallet className="h-6 w-6 text-yellow-500" />
              <motion.span
                className="ml-2 font-semibold text-gray-800"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                Webwise
              </motion.span>
            </div>
            <div className="hidden md:flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-gray-900">Story</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Pricing</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Releases</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Docs</a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <motion.button
              className="text-gray-600 hover:text-gray-900"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Sign In
            </motion.button>
            <motion.button
              className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Get Started
            </motion.button>
          </div>
        </nav>

        <main className="max-w-4xl mx-auto px-6 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-1 mb-6 rounded-full bg-yellow-100 text-yellow-700">
              Webwise
            </div>

            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-6 text-gray-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Welcome to Webwise
            </motion.h1>

            <motion.p
              className="text-gray-600 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate, quas laboriosam!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="relative"
            >
              <motion.button
                className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors flex items-center justify-center mx-auto"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <PlayCircle className="mr-2 h-5 w-5" />
                Watch Video
              </motion.button>
            </motion.div>

            <motion.div
              className="mt-16 bg-yellow-50 p-8 rounded-2xl border-2 border-yellow-200"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Wallet className="h-6 w-6 text-yellow-500 mr-2" />
                  <h2 className="text-2xl font-bold text-gray-800">
                    Special Offer
                  </h2>
                </div>
                <span className="text-2xl font-bold text-yellow-600">$99</span>
              </div>
              <p className="text-gray-600 text-left">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas laboriosam voluptate!
              </p>
            </motion.div>
          </motion.div>
        </main>

        <footer className="border-t mt-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6 py-8">
            <div className="grid grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold mb-4 text-gray-800">Company</h3>
                <a href="#" className="text-gray-600 hover:text-gray-900 block">About Us</a>
                <a href="#" className="text-gray-600 hover:text-gray-900 block">Careers</a>
              </div>
              <div>
                <h3 className="font-semibold mb-4 text-gray-800">Resources</h3>
                <a href="#" className="text-gray-600 hover:text-gray-900 block">Blog</a>
                <a href="#" className="text-gray-600 hover:text-gray-900 block">Documentation</a>
              </div>
              <div>
                <h3 className="font-semibold mb-4 text-gray-800">Other</h3>
                <a href="#" className="text-gray-600 hover:text-gray-900 block">Help Center</a>
                <a href="#" className="text-gray-600 hover:text-gray-900 block">Contact Us</a>
              </div>
            </div>
          </div>
        </footer>
      </div>

      <Link href="/sign-in">
        <motion.button
          className="fixed bottom-5 right-5 bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-600 shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Sign In
        </motion.button>
      </Link>
    </>
  );
};

export default page;
