import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, MessageCircle, Heart, Share2, Award, 
  TrendingUp, Calendar, ChevronLeft,
  Clock, Star, Trophy, BookmarkPlus, 
  MoreHorizontal, User, CheckCircle, 
  Target, Zap, Gift
} from 'lucide-react';

function CommunityScreen({ onBack }) {
  const [activeTab, setActiveTab] = useState('feed');
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [joinedChallenges, setJoinedChallenges] = useState(new Set());
  const [showJoinSuccess, setShowJoinSuccess] = useState(null);

  const communityPosts = [
    {
      id: 1,
      user: "Priya Sharma",
      time: "2 hours ago",
      content: "Great news! The pothole on MG Road has been fixed thanks to our collective reporting. This is what community power looks like!",
      likes: 24,
      comments: 8,
      shares: 3,
      type: "success"
    },
    {
      id: 2,
      user: "Rajesh Kumar",
      time: "5 hours ago",
      content: "Organizing a cleanliness drive this Sunday at Central Park. Who's joining? Let's make our city greener!",
      likes: 18,
      comments: 12,
      shares: 6,
      type: "event"
    },
    {
      id: 3,
      user: "Anita Desai",
      time: "1 day ago",
      content: "The new waste segregation system in our locality is working wonderfully. Kudos to the municipal team!",
      likes: 31,
      comments: 5,
      shares: 2,
      type: "appreciation"
    }
  ];

  const [challenges, setChallenges] = useState([
    {
      id: 1,
      title: "Green Guardian Challenge",
      description: "Report 5 environmental issues this month",
      progress: 60,
      participants: 234,
      reward: "Eco Warrior Badge",
      endDate: "Dec 31, 2024",
      myProgress: 0,
      target: 5,
      completed: 0
    },
    {
      id: 2,
      title: "Community Helper",
      description: "Help resolve 3 neighborhood issues",
      progress: 33,
      participants: 156,
      reward: "Helper Hero Badge",
      endDate: "Jan 15, 2025",
      myProgress: 0,
      target: 3,
      completed: 0
    },
    {
      id: 3,
      title: "Clean Streets Initiative",
      description: "Document and report street cleanliness",
      progress: 80,
      participants: 89,
      reward: "Clean City Champion",
      endDate: "Dec 25, 2024",
      myProgress: 0,
      target: 10,
      completed: 0
    }
  ]);

  const leaderboard = [
    { rank: 1, name: "Amit Patel", points: 1250, trend: "+50" },
    { rank: 2, name: "Sneha Reddy", points: 1180, trend: "+32" },
    { rank: 3, name: "Vikram Singh", points: 1050, trend: "+28" },
    { rank: 4, name: "Meera Joshi", points: 980, trend: "+15" },
    { rank: 5, name: "Rohit Gupta", points: 920, trend: "+8" }
  ];

  const toggleLike = (postId) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const joinChallenge = (challengeId) => {
    if (joinedChallenges.has(challengeId)) return;

    // Update challenge participants count
    setChallenges(prev => prev.map(challenge => 
      challenge.id === challengeId 
        ? { ...challenge, participants: challenge.participants + 1 }
        : challenge
    ));

    // Add to joined challenges
    setJoinedChallenges(prev => new Set([...prev, challengeId]));
    
    // Show success message
    setShowJoinSuccess(challengeId);
    setTimeout(() => setShowJoinSuccess(null), 3000);
  };

  const progressChallenge = (challengeId) => {
    setChallenges(prev => prev.map(challenge => {
      if (challenge.id === challengeId && joinedChallenges.has(challengeId)) {
        const newCompleted = Math.min(challenge.completed + 1, challenge.target);
        const newProgress = Math.round((newCompleted / challenge.target) * 100);
        return { 
          ...challenge, 
          completed: newCompleted, 
          myProgress: newProgress 
        };
      }
      return challenge;
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50/30 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 right-32 w-64 h-64 bg-green-100/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 left-32 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl"></div>
      </div>

      {/* Success Toast */}
      <AnimatePresence>
        {showJoinSuccess && (
          <motion.div
            className="fixed top-20 right-6 z-50 bg-green-500 text-white p-4 rounded-xl shadow-lg flex items-center gap-3"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
          >
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Challenge joined successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="bg-white/90 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors px-3 py-2 rounded-lg hover:bg-gray-100"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="font-medium">Back</span>
            </button>
            
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-800">Community Hub</h1>
              <p className="text-sm text-gray-600">Building better neighborhoods together</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-sm font-bold text-green-600">{joinedChallenges.size}</div>
                <div className="text-xs text-gray-500">Active</div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>234 online</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8 relative z-10">
        {/* Tab Navigation */}
        <div className="flex items-center justify-center gap-1 mb-8 bg-white rounded-xl border border-gray-200 shadow-sm p-1">
          <button
            onClick={() => setActiveTab('feed')}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'feed' 
                ? 'bg-green-500 text-white shadow-md' 
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            }`}
          >
            <MessageCircle className="w-5 h-5" />
            <span>Community Feed</span>
          </button>

          <button
            onClick={() => setActiveTab('challenges')}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all relative ${
              activeTab === 'challenges' 
                ? 'bg-green-500 text-white shadow-md' 
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            }`}
          >
            <Award className="w-5 h-5" />
            <span>Challenges</span>
            {joinedChallenges.size > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {joinedChallenges.size}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'leaderboard' 
                ? 'bg-green-500 text-white shadow-md' 
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            }`}
          >
            <TrendingUp className="w-5 h-5" />
            <span>Leaderboard</span>
          </button>
        </div>

        {/* Community Feed */}
        {activeTab === 'feed' && (
          <div className="space-y-6">
            {communityPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="p-6 pb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">{post.user}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          post.type === 'success' ? 'bg-green-100 text-green-700' :
                          post.type === 'event' ? 'bg-blue-100 text-blue-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {post.type === 'success' ? 'Success Story' : 
                           post.type === 'event' ? 'Community Event' : 'Appreciation'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>{post.time}</span>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreHorizontal className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>

                  <p className="text-gray-700 leading-relaxed">{post.content}</p>
                </div>

                <div className="px-6 py-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleLike(post.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                          likedPosts.has(post.id)
                            ? 'bg-red-100 text-red-600'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                        <span>{likedPosts.has(post.id) ? post.likes + 1 : post.likes}</span>
                      </button>
                      
                      <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-all">
                        <MessageCircle className="w-4 h-4" />
                        <span>{post.comments}</span>
                      </button>
                      
                      <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-all">
                        <Share2 className="w-4 h-4" />
                        <span>{post.shares}</span>
                      </button>
                    </div>
                    
                    <button className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all">
                      <BookmarkPlus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Enhanced Challenges */}
        {activeTab === 'challenges' && (
          <div className="space-y-6">
            {challenges.map((challenge) => {
              const isJoined = joinedChallenges.has(challenge.id);
              const isCompleted = isJoined && challenge.completed >= challenge.target;
              
              return (
                <div
                  key={challenge.id}
                  className={`bg-white rounded-xl border-2 shadow-sm hover:shadow-md transition-all duration-300 ${
                    isJoined ? 'border-green-200 bg-green-50/30' : 'border-gray-200'
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{challenge.title}</h3>
                          {isJoined && (
                            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" />
                              Joined
                            </span>
                          )}
                          {isCompleted && (
                            <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                              <Trophy className="w-3 h-3" />
                              Completed
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600">{challenge.description}</p>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-2xl font-bold text-green-600">{challenge.progress}%</div>
                        <div className="text-sm text-gray-500">Overall</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Users className="w-5 h-5 text-green-600" />
                        <div>
                          <div className="font-semibold text-gray-900">{challenge.participants}</div>
                          <div className="text-sm text-gray-500">Participants</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Calendar className="w-5 h-5 text-blue-600" />
                        <div>
                          <div className="font-semibold text-gray-900">{challenge.endDate}</div>
                          <div className="text-sm text-gray-500">End Date</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Target className="w-5 h-5 text-purple-600" />
                        <div>
                          <div className="font-semibold text-gray-900">{challenge.target}</div>
                          <div className="text-sm text-gray-500">Target</div>
                        </div>
                      </div>
                    </div>

                    {/* My Progress (only show if joined) */}
                    {isJoined && (
                      <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-green-900">Your Progress</h4>
                          <span className="text-green-700 font-bold">
                            {challenge.completed}/{challenge.target}
                          </span>
                        </div>
                        <div className="w-full bg-green-200 rounded-full h-3 mb-3">
                          <div
                            className="h-3 bg-green-500 rounded-full transition-all duration-500"
                            style={{ width: `${challenge.myProgress}%` }}
                          ></div>
                        </div>
                        {challenge.completed < challenge.target && (
                          <button
                            onClick={() => progressChallenge(challenge.id)}
                            className="w-full py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                          >
                            <Zap className="w-4 h-4" />
                            Make Progress
                          </button>
                        )}
                      </div>
                    )}

                    {/* Overall Progress Bar */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Community Progress</span>
                        <span className="text-sm text-gray-600">{challenge.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 bg-blue-500 rounded-full"
                          style={{ width: `${challenge.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <Gift className="w-5 h-5 text-yellow-600" />
                        <div>
                          <div className="font-semibold text-yellow-900">Reward</div>
                          <div className="text-sm text-yellow-700">{challenge.reward}</div>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => joinChallenge(challenge.id)}
                        disabled={isJoined}
                        className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                          isJoined
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-green-500 text-white hover:bg-green-600'
                        }`}
                      >
                        {isJoined ? 'Joined' : 'Join Challenge'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Leaderboard */}
        {activeTab === 'leaderboard' && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <Trophy className="w-6 h-6 text-yellow-600" />
                <h3 className="text-xl font-bold text-gray-900">Community Champions</h3>
              </div>
              <p className="text-gray-600 mt-1">Top contributors this month</p>
            </div>
            
            <div className="divide-y divide-gray-100">
              {leaderboard.map((user, index) => (
                <div
                  key={user.rank}
                  className={`p-6 hover:bg-gray-50 transition-colors ${
                    index < 3 ? 'bg-yellow-50/50' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          index === 0 ? 'bg-yellow-500 text-white' :
                          index === 1 ? 'bg-gray-400 text-white' :
                          index === 2 ? 'bg-amber-600 text-white' :
                          'bg-gray-200 text-gray-600'
                        }`}>
                          #{user.rank}
                        </div>
                        
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="font-semibold text-gray-900">{user.name}</div>
                          {index < 3 && (
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          )}
                        </div>
                        <div className="text-sm text-gray-500">Active Contributor</div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">
                        {user.points.toLocaleString()}
                      </div>
                      <div className="text-sm text-green-600">{user.trend} this week</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-6 bg-gray-50 text-center border-t border-gray-200">
              <p className="text-gray-600 mb-4">Want to climb the leaderboard?</p>
              <button 
                onClick={onBack}
                className="px-6 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
              >
                Start Reporting Issues
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CommunityScreen;
