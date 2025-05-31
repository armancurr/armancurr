"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { RotateCcw, Settings, Clock, Target, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const DEFAULT_TEXT =
  "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the alphabet and is commonly used for typing practice. It helps improve finger dexterity and typing speed while ensuring all keys are utilized during practice sessions."

export default function TypingSpeedTest() {
  // Core state
  const [customText, setCustomText] = useState(DEFAULT_TEXT)
  const [testText, setTestText] = useState(DEFAULT_TEXT)
  const [userInput, setUserInput] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  // Timer and test state
  const [isActive, setIsActive] = useState(false)
  const [startTime, setStartTime] = useState(null)
  const [elapsedTime, setElapsedTime] = useState(0)

  // Statistics
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  const [correctChars, setCorrectChars] = useState(0)
  const [totalChars, setTotalChars] = useState(0)

  // UI state
  const [showCustomInput, setShowCustomInput] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  // Refs
  const inputRef = useRef(null)
  const intervalRef = useRef(null)

  // Calculate WPM and accuracy
  const calculateStats = useCallback(() => {
    if (elapsedTime > 0) {
      const minutes = elapsedTime / 60
      const wordsTyped = correctChars / 5 // Standard: 5 characters = 1 word
      const currentWpm = Math.round(wordsTyped / minutes)
      setWpm(currentWpm)
    }

    if (totalChars > 0) {
      const currentAccuracy = Math.round((correctChars / totalChars) * 100)
      setAccuracy(currentAccuracy)
    }
  }, [elapsedTime, correctChars, totalChars])

  // Timer effect
  useEffect(() => {
    if (isActive && !isCompleted) {
      intervalRef.current = setInterval(() => {
        setElapsedTime((prev) => prev + 1)
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }

    return () => clearInterval(intervalRef.current)
  }, [isActive, isCompleted])

  // Calculate stats when relevant values change
  useEffect(() => {
    calculateStats()
  }, [calculateStats])

  // Handle typing input
  const handleInputChange = (e) => {
    const value = e.target.value

    // Start timer on first keystroke
    if (!isActive && value.length === 1) {
      setIsActive(true)
      setStartTime(Date.now())
    }

    // Prevent typing beyond text length
    if (value.length > testText.length) {
      return
    }

    setUserInput(value)
    setCurrentIndex(value.length)

    // Calculate correct characters
    let correct = 0
    for (let i = 0; i < value.length; i++) {
      if (value[i] === testText[i]) {
        correct++
      }
    }

    setCorrectChars(correct)
    setTotalChars(value.length)

    // Check if test is completed
    if (value.length === testText.length) {
      setIsCompleted(true)
      setIsActive(false)
    }
  }

  // Reset test
  const resetTest = () => {
    setUserInput("")
    setCurrentIndex(0)
    setIsActive(false)
    setStartTime(null)
    setElapsedTime(0)
    setWpm(0)
    setAccuracy(100)
    setCorrectChars(0)
    setTotalChars(0)
    setIsCompleted(false)
    inputRef.current?.focus()
  }

  // Apply custom text
  const applyCustomText = () => {
    if (customText.trim()) {
      setTestText(customText.trim())
      resetTest()
      setShowCustomInput(false)
    }
  }

  // Get character styling
  const getCharacterStyle = (index) => {
    if (index < userInput.length) {
      return userInput[index] === testText[index] ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
    } else if (index === currentIndex) {
      return "bg-blue-200 border-l-2 border-blue-500"
    }
    return "text-gray-600"
  }

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">Typing Speed Test</h1>
          <p className="text-gray-600">Test your typing speed with custom text</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Zap className="h-5 w-5 text-blue-500" />
                <span className="text-sm font-medium text-gray-600">WPM</span>
              </div>
              <div className="text-2xl font-bold text-blue-600">{wpm}</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Target className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium text-gray-600">Accuracy</span>
              </div>
              <div className="text-2xl font-bold text-green-600">{accuracy}%</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Clock className="h-5 w-5 text-orange-500" />
                <span className="text-sm font-medium text-gray-600">Time</span>
              </div>
              <div className="text-2xl font-bold text-orange-600">{formatTime(elapsedTime)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <span className="text-sm font-medium text-gray-600">Progress</span>
              </div>
              <div className="text-2xl font-bold text-purple-600">
                {Math.round((currentIndex / testText.length) * 100)}%
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Custom Text Input */}
        {showCustomInput && (
          <Card>
            <CardHeader>
              <CardTitle>Custom Text</CardTitle>
              <CardDescription>Enter your own text for typing practice</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="Enter your custom text here..."
                className="min-h-[120px]"
              />
              <div className="flex space-x-2">
                <Button onClick={applyCustomText}>Apply Text</Button>
                <Button variant="outline" onClick={() => setShowCustomInput(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Text Display */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Typing Test</CardTitle>
                <CardDescription>Type the text below as accurately and quickly as possible</CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => setShowCustomInput(!showCustomInput)}>
                  <Settings className="h-4 w-4 mr-2" />
                  Custom Text
                </Button>
                <Button variant="outline" size="sm" onClick={resetTest}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Text to type */}
            <div className="p-4 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
              <div className="text-lg leading-relaxed font-mono">
                {testText.split("").map((char, index) => (
                  <span key={index} className={`${getCharacterStyle(index)} transition-colors duration-150`}>
                    {char}
                  </span>
                ))}
              </div>
            </div>

            {/* Input area */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Your typing:</label>
              <Textarea
                ref={inputRef}
                value={userInput}
                onChange={handleInputChange}
                placeholder="Start typing here..."
                className="min-h-[120px] text-lg font-mono"
                disabled={isCompleted}
                autoFocus
              />
            </div>

            {/* Progress bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Progress</span>
                <span>
                  {currentIndex} / {testText.length} characters
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentIndex / testText.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Completion message */}
            {isCompleted && (
              <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
                <h3 className="text-xl font-bold text-green-800 mb-2">🎉 Test Completed!</h3>
                <div className="flex justify-center space-x-6 text-sm">
                  <div>
                    <span className="font-medium">Final WPM:</span>
                    <Badge variant="secondary" className="ml-2">
                      {wpm}
                    </Badge>
                  </div>
                  <div>
                    <span className="font-medium">Accuracy:</span>
                    <Badge variant="secondary" className="ml-2">
                      {accuracy}%
                    </Badge>
                  </div>
                  <div>
                    <span className="font-medium">Time:</span>
                    <Badge variant="secondary" className="ml-2">
                      {formatTime(elapsedTime)}
                    </Badge>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>How to Use</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Getting Started:</h4>
                <ul className="space-y-1">
                  <li>• Click in the text area and start typing</li>
                  <li>• Timer starts automatically with your first keystroke</li>
                  <li>• Type as accurately and quickly as possible</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Features:</h4>
                <ul className="space-y-1">
                  <li>• Real-time WPM calculation</li>
                  <li>• Character-by-character feedback</li>
                  <li>• Custom text input support</li>
                  <li>• Accuracy tracking</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
