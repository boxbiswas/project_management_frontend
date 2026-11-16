import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchComments,
  addComment,
  deleteComment,
} from '../../redux/slices/commentSlice.js';
import {
  MessageSquare,
  Send,
  Loader2,
  Trash2,
  CornerDownLeft,
} from 'lucide-react';

export default function CommentSection({ ticketId, canComment = true, projectMembers = [] }) {
  const dispatch = useDispatch();
  const [commentText, setCommentText] = useState('');
  const [localError, setLocalError] = useState('');

  const { user } = useSelector((state) => state.auth);
  const { commentsByTicket, loading, submitting } = useSelector((state) => state.comments);

  const comments = commentsByTicket[ticketId] || [];

  // Fetch comments when ticketId changes
  useEffect(() => {
    if (ticketId) {
      dispatch(fetchComments(ticketId));
    }
  }, [dispatch, ticketId]);

  // Handle comment submission
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (!commentText.trim()) {
      setLocalError('Please write a comment before posting');
      return;
    }

    setLocalError('');
    const result = await dispatch(
      addComment({
        ticketId,
        text: commentText.trim(),
      })
    );

    if (addComment.fulfilled.match(result)) {
      setCommentText('');
    } else {
      setLocalError(result.payload || 'Failed to post comment');
    }
  };

  // Allow Ctrl+Enter or Cmd+Enter to submit
  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  // Handle comment deletion
  const handleDelete = (commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      dispatch(deleteComment({ ticketId, commentId }));
    }
  };

  // Helper to get initials for author avatar
  const getInitials = (userObj) => {
    if (!userObj?.name) return 'U';
    const parts = userObj.name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
  };

  // Helper to format comment timestamp
  const formatTimestamp = (dateString) => {
    if (!dateString) return 'Just now';
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    });
  };

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-[#F5E6D3] pb-2.5">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-[#EA580C]" />
          <h3 className="text-sm font-bold text-[#292524] tracking-tight">Activity & Comments</h3>
          <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-[#FFEDD5] text-[#9A3412]">
            {comments.length}
          </span>
        </div>
      </div>

      {/* Comment Input Box */}
      {canComment ? (
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="bg-[#FAF5EE] rounded-2xl border border-[#F5E6D3] p-3 focus-within:border-[#F97316] focus-within:ring-2 focus-within:ring-[#F97316]/15 transition-all">
            <div className="flex items-start gap-3">
              <div
                className="w-8 h-8 rounded-full bg-[#EA580C] text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs"
                title={user?.name || 'You'}
              >
                {getInitials(user)}
              </div>
              <textarea
                value={commentText}
                onChange={(e) => {
                  setCommentText(e.target.value);
                  if (localError) setLocalError('');
                }}
                onKeyDown={handleKeyDown}
                placeholder="Write a comment or update... (Ctrl+Enter to post)"
                rows={2}
                className="w-full bg-transparent text-sm text-[#292524] placeholder-[#A8A29E] focus:outline-hidden resize-none leading-relaxed"
              />
            </div>

            <div className="mt-2 pt-2 border-t border-[#E7D5BF]/60 flex items-center justify-between">
              <span className="text-[11px] text-[#A8A29E] hidden sm:inline flex items-center gap-1">
                <span>Press</span>
                <kbd className="px-1.5 py-0.5 rounded bg-white border border-[#E7D5BF] font-mono text-[10px] text-[#78716C]">
                  Ctrl+Enter
                </kbd>
                <span>to send</span>
              </span>

              <button
                type="submit"
                disabled={submitting || !commentText.trim()}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#EA580C] hover:bg-[#C2410C] disabled:bg-[#FED7AA] disabled:cursor-not-allowed text-white text-xs font-semibold transition-colors shadow-xs ml-auto"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Posting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Comment</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {localError && (
            <p className="text-xs text-red-600 px-1 font-medium">{localError}</p>
          )}
        </form>
      ) : (
        <p className="text-xs text-[#78716C] italic bg-[#FAF5EE] p-3 rounded-xl">
          You have view-only access to this project.
        </p>
      )}

      {/* Comment History List */}
      <div className="space-y-3 pt-1">
        {loading && comments.length === 0 ? (
          <div className="py-8 flex items-center justify-center text-[#78716C] gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-[#F97316]" />
            <span className="text-xs">Loading comments...</span>
          </div>
        ) : comments.length === 0 ? (
          <div className="py-8 text-center bg-[#FAF5EE]/50 rounded-2xl border border-dashed border-[#E7D5BF] p-4">
            <MessageSquare className="w-6 h-6 text-[#A8A29E] mx-auto mb-1.5 opacity-60" />
            <p className="text-xs font-semibold text-[#44403C]">No comments yet</p>
            <p className="text-[11px] text-[#78716C] mt-0.5">
              Be the first to share an update, discuss progress, or ask a question.
            </p>
          </div>
        ) : (
          comments.map((comment) => {
            const author = comment.userId || {};
            const isCurrentUser =
              user?.id === (author._id || author.id) ||
              user?._id === (author._id || author.id);

            return (
              <div
                key={comment._id}
                className="group relative bg-white rounded-xl border border-[#F5E6D3] p-3.5 shadow-[0_1px_2px_rgba(124,45,18,0.04)] hover:border-[#E7D5BF] transition-all"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-7 h-7 rounded-full bg-[#FFEDD5] text-[#9A3412] font-bold text-xs flex items-center justify-center shrink-0 border border-[#FED7AA]"
                      title={author.email || author.name}
                    >
                      {getInitials(author)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#292524]">
                          {author.name || 'Team member'}
                        </span>
                        {isCurrentUser && (
                          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[#FFF7ED] text-[#EA580C] font-semibold border border-[#FFEDD5]">
                            You
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-[#A8A29E] block">
                        {formatTimestamp(comment.createdAt)}
                      </span>
                    </div>
                  </div>

                  {/* Comment Actions */}
                  {isCurrentUser && (
                    <button
                      type="button"
                      onClick={() => handleDelete(comment._id)}
                      className="opacity-0 group-hover:opacity-100 p-1 rounded-md text-[#A8A29E] hover:text-red-600 hover:bg-red-50 transition-all"
                      title="Delete comment"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Comment Text Content */}
                <div className="text-xs text-[#44403C] leading-relaxed whitespace-pre-wrap pl-9">
                  {comment.text}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
