'use client'

import { useState } from 'react'
import { CheckCircle, XCircle, AlertCircle, ChevronRight } from 'lucide-react'

export interface Question {
  id: string
  question: string
  type: 'multiple-choice' | 'code' | 'true-false'
  options?: string[]
  correctAnswer: string | number | boolean
  explanation: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  interviewContext?: string
}

interface InteractiveQuizProps {
  questions: Question[]
  title: string
}

export default function InteractiveQuiz({ questions, title }: InteractiveQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | number | boolean | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set())

  const question = questions[currentQuestion]
  const isCorrect = selectedAnswer !== null && selectedAnswer === question.correctAnswer
  const progress = ((answeredQuestions.size) / questions.length) * 100

  const handleAnswer = (answer: string | number | boolean) => {
    setSelectedAnswer(answer)
    setShowExplanation(true)

    if (!answeredQuestions.has(currentQuestion)) {
      if (answer === question.correctAnswer) {
        setScore(score + 1)
      }
      setAnsweredQuestions(new Set(answeredQuestions).add(currentQuestion))
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100'
      case 'intermediate': return 'text-yellow-600 bg-yellow-100'
      case 'advanced': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg border-2 border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <div className="flex items-center justify-between text-sm">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>Score: {score}/{answeredQuestions.size}</span>
        </div>
        <div className="mt-3 bg-white/20 rounded-full h-2">
          <div
            className="bg-white h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Content */}
      <div className="p-6 space-y-6">
        {/* Difficulty Badge */}
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${getDifficultyColor(question.difficulty)}`}>
            {question.difficulty}
          </span>
          <span className="text-sm text-gray-500">
            {question.type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </span>
        </div>

        {/* Question */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <p className="text-lg font-medium text-gray-900">{question.question}</p>
          {question.interviewContext && (
            <div className="mt-3 flex items-start gap-2 text-sm text-gray-600 bg-blue-50 p-3 rounded border border-blue-200">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-blue-900">Interview Context:</span>
                <p className="mt-1">{question.interviewContext}</p>
              </div>
            </div>
          )}
        </div>

        {/* Options */}
        {question.type === 'multiple-choice' && question.options && (
          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index
              const isCorrectOption = index === question.correctAnswer
              const showCorrect = showExplanation && isCorrectOption
              const showWrong = showExplanation && isSelected && !isCorrect

              return (
                <button
                  key={index}
                  onClick={() => !showExplanation && handleAnswer(index)}
                  disabled={showExplanation}
                  className={`w-full text-left p-4 rounded-lg border-2 transition ${
                    showCorrect
                      ? 'border-green-500 bg-green-50'
                      : showWrong
                      ? 'border-red-500 bg-red-50'
                      : isSelected
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                  } ${showExplanation ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`${showCorrect || showWrong ? 'font-semibold' : ''}`}>
                      {option}
                    </span>
                    {showCorrect && <CheckCircle className="w-5 h-5 text-green-600" />}
                    {showWrong && <XCircle className="w-5 h-5 text-red-600" />}
                  </div>
                </button>
              )
            })}
          </div>
        )}

        {question.type === 'true-false' && (
          <div className="grid grid-cols-2 gap-4">
            {['True', 'False'].map((option, index) => {
              const answer = option === 'True'
              const isSelected = selectedAnswer === answer
              const isCorrectOption = answer === question.correctAnswer
              const showCorrect = showExplanation && isCorrectOption
              const showWrong = showExplanation && isSelected && !isCorrect

              return (
                <button
                  key={option}
                  onClick={() => !showExplanation && handleAnswer(answer)}
                  disabled={showExplanation}
                  className={`p-6 rounded-lg border-2 font-semibold text-lg transition ${
                    showCorrect
                      ? 'border-green-500 bg-green-50 text-green-900'
                      : showWrong
                      ? 'border-red-500 bg-red-50 text-red-900'
                      : isSelected
                      ? 'border-blue-500 bg-blue-50 text-blue-900'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50 text-gray-700'
                  } ${showExplanation ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center justify-center gap-2">
                    {option}
                    {showCorrect && <CheckCircle className="w-6 h-6" />}
                    {showWrong && <XCircle className="w-6 h-6" />}
                  </div>
                </button>
              )
            })}
          </div>
        )}

        {/* Explanation */}
        {showExplanation && (
          <div className={`p-4 rounded-lg border-2 ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <div className="flex items-start gap-3">
              {isCorrect ? (
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <h4 className={`font-bold mb-2 ${isCorrect ? 'text-green-900' : 'text-red-900'}`}>
                  {isCorrect ? 'Correct!' : 'Not quite right'}
                </h4>
                <p className={`text-sm ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                  {question.explanation}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="bg-gray-50 p-4 flex items-center justify-between border-t">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          ← Previous
        </button>
        {currentQuestion < questions.length - 1 ? (
          <button
            onClick={handleNext}
            disabled={!showExplanation}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold flex items-center gap-2"
          >
            Next Question
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">
              {score}/{questions.length}
            </div>
            <div className="text-sm text-gray-600">
              {Math.round((score / questions.length) * 100)}% Complete
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
