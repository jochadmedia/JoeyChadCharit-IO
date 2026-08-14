import React, { useState } from 'react';
import { ACADEMY_COURSES } from '../data/mockData';
import { AcademyCourse } from '../types';
import { BookOpen, Play, CheckCircle2, Award, Download, Clock, Star, Users, X } from 'lucide-react';
import { useToast } from './Toast';

export const AcademyView: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<AcademyCourse>(ACADEMY_COURSES[0]);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [showCertificate, setShowCertificate] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const { showToast } = useToast();

  const activeLesson = selectedCourse.lessons[activeLessonIndex] || selectedCourse.lessons[0];

  const toggleLessonComplete = (lessonId: string) => {
    setSelectedCourse(prev => ({
      ...prev,
      lessons: prev.lessons.map(l => l.id === lessonId ? { ...l, completed: !l.completed } : l)
    }));
  };

  const completedCount = selectedCourse.lessons.filter(l => l.completed).length;
  const isCourseComplete = completedCount === selectedCourse.lessons.length;

  const handleQuizSubmit = () => {
    if (selectedQuizOption === null) return;
    setQuizSubmitted(true);
    if (selectedQuizOption === 0) {
      showToast('Quiz Passed!', 'Correct! +20 XP awarded to your Joey Academy rank.', 'success');
    } else {
      showToast('Incorrect', 'Review the lesson video and try again!', 'warning');
    }
  };

  return (
    <div className="space-y-8 py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-[#0B192C] to-emerald-950 border border-slate-800 p-6 sm:p-8 space-y-3">
        <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Product Idea #5 • Joey Football Academy</span>
        </div>
        <h1 className="text-3xl font-black text-white">
          Netflix-Style Structured <span className="text-emerald-400">Football Masterclasses</span>
        </h1>
        <p className="text-slate-300 text-sm max-w-2xl">
          Comprehensive structured video courses taught by legends and academy directors. Complete lessons to earn your official Joey Chad Football Certificate of Excellence.
        </p>
      </div>

      {/* Main Studio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Player & Lesson Viewer */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
          {/* Active Course Title */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-[10px] text-amber-400 font-bold uppercase">{selectedCourse.category}</span>
              <h2 className="text-xl font-black text-white">{selectedCourse.title}</h2>
              <p className="text-xs text-slate-400">Instructor: {selectedCourse.instructor}</p>
            </div>

            {isCourseComplete && (
              <button
                onClick={() => setShowCertificate(true)}
                className="bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 px-4 py-2 rounded-2xl text-xs font-black flex items-center gap-2 shadow-lg cursor-pointer"
              >
                <Award className="w-4 h-4 fill-slate-950" />
                <span>Get Certificate</span>
              </button>
            )}
          </div>

          {/* Video Player Frame */}
          <div className="relative aspect-video rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 group">
            <img
              src={selectedCourse.thumbnail}
              alt={selectedCourse.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-500/90 text-slate-950 flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform cursor-pointer">
                <Play className="w-6 h-6 fill-slate-950 ml-1" />
              </div>
              <div className="bg-slate-950/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-slate-800 max-w-md space-y-2">
                <p className="text-xs font-bold text-white">Playing Lesson #{activeLessonIndex + 1}: {activeLesson.title}</p>
                <p className="text-[10px] text-slate-400">{activeLesson.description}</p>
                <button
                  onClick={() => {
                    setSelectedQuizOption(null);
                    setQuizSubmitted(false);
                    setShowQuizModal(true);
                  }}
                  className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 text-[10px] font-bold px-3 py-1 rounded-xl transition-all cursor-pointer"
                >
                  Take Tactical Knowledge Quiz (+20 XP)
                </button>
              </div>
            </div>
          </div>

          {/* Lesson Checklist */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                Course Modules ({completedCount} / {selectedCourse.lessons.length} Completed)
              </h3>
              <div className="w-28 h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all duration-500"
                  style={{ width: `${(completedCount / selectedCourse.lessons.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-2">
              {selectedCourse.lessons.map((lesson, idx) => {
                const isActive = idx === activeLessonIndex;
                return (
                  <div
                    key={lesson.id}
                    onClick={() => setActiveLessonIndex(idx)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isActive
                        ? 'bg-slate-950 border-emerald-500 text-white'
                        : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLessonComplete(lesson.id);
                        }}
                        className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                          lesson.completed ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-500'
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                      <div>
                        <p className="text-xs font-bold">{lesson.title}</p>
                        <p className="text-[10px] text-slate-400">{lesson.description}</p>
                      </div>
                    </div>

                    <span className="text-[10px] text-slate-400 font-medium shrink-0 ml-2">{lesson.duration}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Course Catalog */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-xl">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              Academy Course Catalog
            </h3>

            <div className="space-y-3">
              {ACADEMY_COURSES.map((course) => {
                const isSelected = selectedCourse.id === course.id;
                return (
                  <div
                    key={course.id}
                    onClick={() => {
                      setSelectedCourse(course);
                      setActiveLessonIndex(0);
                    }}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                      isSelected
                        ? 'bg-slate-950 border-emerald-500 shadow-md shadow-emerald-900/30'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="relative aspect-video rounded-xl overflow-hidden">
                      <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                      <span className="absolute top-2 right-2 bg-slate-950/90 text-amber-300 text-[9px] font-bold px-2 py-0.5 rounded">
                        {course.category}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-white">{course.title}</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">{course.lessonsCount} Lessons • {course.durationMinutes} Mins</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Quiz Modal */}
      {showQuizModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-4 relative shadow-2xl">
            <button
              onClick={() => setShowQuizModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2.5 py-0.5 rounded uppercase">
              Tactical Knowledge Check
            </span>
            <h3 className="text-base font-bold text-white">Quiz: {activeLesson.title}</h3>

            <p className="text-xs text-slate-200 font-medium">
              Q: What is the primary mechanics focus point when executing this tactical drill?
            </p>

            <div className="space-y-2 text-xs">
              {[
                "A) Keeping plant foot balanced & Scanning shoulder early",
                "B) Closing eyes right before receiving the ball",
                "C) Kicking as hard as possible without control"
              ].map((option, idx) => (
                <div
                  key={idx}
                  onClick={() => !quizSubmitted && setSelectedQuizOption(idx)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    selectedQuizOption === idx
                      ? 'bg-emerald-950 border-emerald-500 text-white font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {option}
                </div>
              ))}
            </div>

            {quizSubmitted && (
              <div className={`p-3 rounded-xl text-xs font-bold ${
                selectedQuizOption === 0 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
              }`}>
                {selectedQuizOption === 0 ? '✅ Correct! +20 XP awarded!' : '❌ Incorrect. Answer A is correct.'}
              </div>
            )}

            {!quizSubmitted ? (
              <button
                onClick={handleQuizSubmit}
                disabled={selectedQuizOption === null}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl text-xs disabled:opacity-50 cursor-pointer"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={() => setShowQuizModal(false)}
                className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-2.5 rounded-xl text-xs cursor-pointer"
              >
                Close
              </button>
            )}
          </div>
        </div>
      )}

      {/* Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border-2 border-amber-500/80 rounded-3xl p-8 max-w-xl w-full text-center space-y-6 shadow-2xl relative">
            <button
              onClick={() => setShowCertificate(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white font-bold text-lg"
            >
              ✕
            </button>

            <div className="space-y-2">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-yellow-600 text-slate-950 flex items-center justify-center mx-auto shadow-lg">
                <Award className="w-8 h-8 fill-slate-950" />
              </div>
              <p className="text-xs font-black text-amber-400 tracking-widest uppercase">Certificate of Completion</p>
              <h2 className="text-2xl font-black text-white">JOEY CHAD ACADEMY</h2>
            </div>

            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-2">
              <p className="text-xs text-slate-400">This certifies that</p>
              <p className="text-xl font-bold text-emerald-400">You (Academy Athlete)</p>
              <p className="text-xs text-slate-300">has successfully mastered all modules of</p>
              <p className="text-sm font-black text-white">{selectedCourse.title}</p>
            </div>

            <p className="text-[11px] text-slate-400 italic">
              "Keep playing with purpose, passion, and Joey's spirit."
            </p>

            <button
              onClick={() => {
                showToast('Certificate Saved!', 'Official PDF certificate exported to your device.', 'success');
                setShowCertificate(false);
              }}
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 rounded-2xl text-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download Official Certificate</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
