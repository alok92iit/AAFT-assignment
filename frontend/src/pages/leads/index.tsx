import { useEffect, useLayoutEffect, useState } from 'react';
import { ChevronRight, Mail, Phone, User, Briefcase, Calendar, MapPin, Zap, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { tableAction } from '@/store/actions/table-action';
import { apiUrl } from '@/lib/urls';
import { SET_LEADINFO } from '@/store/reducers/table-reducer';
import { useParams } from 'react-router';
import Api from '@/lib/api';

export default function LeadDetail() {
  const lead = useSelector((state) => state?.table?.leadsInfo);
  const [showLostConfirm, setShowLostConfirm] = useState(false);

  const stages = [
    { id: 'new', label: 'New', emoji: '✨', color: 'slate' },
    { id: 'contacted', label: 'Contacted', emoji: '📞', color: 'blue' },
    { id: 'qualified', label: 'Qualified', emoji: '⭐', color: 'amber' },
    { id: 'converted', label: 'Converted', emoji: '🎉', color: 'emerald' },
  ];

  let index = {
    new: 0,
    contacted: 1,
    qualified: 2,
    converted: 3,
  };

  const currentStageIndex = index[lead.status];
  const canAdvance = currentStageIndex < stages.length - 1 && lead.status!="lost";

  const handleNextStage = async () => {
    if (canAdvance) {
      let res = await Api.get({
        url: apiUrl.leads + '/' + id + '/status',
        contentType: 'application/json',
        show: 1,
      });
      if (res.status == 200) {
        dispatch(tableAction.getTable(apiUrl.leads + '/' + id, SET_LEADINFO));
      }
    }
  };

  const handleMarkLost = async () => {
    try {
      let res = await Api.post({
        url: apiUrl.leads + '/' + id + '/mark-lost',
        contentType: 'application/json',
      });
      if (res.status == 200) {
        setShowLostConfirm(false);
        dispatch(tableAction.getTable(apiUrl.leads + '/' + id, SET_LEADINFO));
      }
    } catch (error) {
      console.error('Error marking lead as lost:', error);
    }
  };

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(tableAction.getTable(apiUrl.leads + '/' + id, SET_LEADINFO));
  }, [id, lead.status]);

  return (
    <div className="min-h-screen bg-white p-6 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Lead Details 👋</h1>
          <p className="text-gray-600">Track this amazing lead through the sales pipeline</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Lead Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Lead Profile Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border-2 border-blue-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-1">{lead.name}</h2>
                </div>
                <div className="text-4xl">👤</div>
              </div>

              {/* Contact Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-white rounded-2xl p-5 border-2 border-blue-100 hover:border-blue-200 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-semibold text-gray-600 uppercase">Email</span>
                  </div>
                  <p className="text-gray-900 font-medium break-all">{lead.email}</p>
                </div>

                <div className="bg-white rounded-2xl p-5 border-2 border-green-100 hover:border-green-200 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <Phone className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-semibold text-gray-600 uppercase">Mobile</span>
                  </div>
                  <p className="text-gray-900 font-medium">{lead.phoneNo}</p>
                </div>

                <div className="bg-white rounded-2xl p-5 border-2 border-purple-100 hover:border-purple-200 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xl">📊</span>
                    <span className="text-sm font-semibold text-gray-600 uppercase">Source</span>
                  </div>
                  <p className="text-gray-900 font-medium">{lead.source}</p>
                </div>
              </div>
            </div>

            {/* People Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-100 hover:shadow-md transition-shadow">
                <h3 className="text-sm font-bold text-gray-700 uppercase mb-4 flex items-center gap-2">
                  👉 Assigned To
                </h3>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                    JS
                  </div>
                  <div>
                    <p className="text-gray-900 font-bold text-lg">{lead?.assignedTo?.name}</p>
                    <p className="text-gray-600 text-sm">Sales Executive</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border-2 border-emerald-100 hover:shadow-md transition-shadow">
                <h3 className="text-sm font-bold text-gray-700 uppercase mb-4 flex items-center gap-2">
                  👑 Lead Owner
                </h3>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                    ED
                  </div>
                  <div>
                    <p className="text-gray-900 font-bold text-lg">{lead?.createdBy?.name}</p>
                    <p className="text-gray-600 text-sm">Team Lead</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border-2 border-orange-100">
                <div className="flex items-center gap-3 mb-3">
                  <Calendar className="w-5 h-5 text-orange-600" />
                  <span className="text-sm font-bold text-gray-700 uppercase">Date Added</span>
                </div>
                <p className="text-gray-900 font-semibold text-lg">{lead.createdAt}</p>
              </div>

              <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-6 border-2 border-violet-100">
                <div className="flex items-center gap-3 mb-3">
                  <Zap className="w-5 h-5 text-violet-600" />
                  <span className="text-sm font-bold text-gray-700 uppercase">Last Contacted</span>
                </div>
                <p className="text-gray-900 font-semibold text-lg">{lead.updatedAt}</p>
              </div>
            </div>
          </div>

          {/* Right Column - Lead Pipeline */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-3xl p-6 border-2 border-indigo-100 sticky top-8 shadow-md">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">📈 Lead Pipeline</h3>

              {/* Lost Badge */}
              {lead.status=="lost" && (
                <div className="mb-6 bg-red-100 border-2 border-red-300 rounded-2xl p-4 text-center">
                  <p className="text-red-600 font-bold text-lg">❌ Lead Lost</p>
                  <p className="text-red-500 text-sm mt-1">This lead is no longer active</p>
                </div>
              )}

              {/* Stages */}
              <div className="space-y-3 mb-8">
                {stages.map((stage, idx) => {
                  const isActive = stage.id === lead?.status;
                  const isCompleted = stages.findIndex(s => s.id === lead?.status) > idx;

                  return (
                    <div key={stage.id}>
                      <button
                        disabled={lead?.status === 'lost'}
                        className={`w-full text-left transition-all duration-300 rounded-2xl p-4 border-2 font-semibold flex items-center gap-3 ${
                          lead?.status === 'lost'
                            ? 'opacity-50 cursor-not-allowed'
                            : isActive
                            ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-blue-400 shadow-lg scale-105'
                            : isCompleted
                            ? 'bg-emerald-100 text-gray-900 border-emerald-300 hover:bg-emerald-200'
                            : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <span className="text-2xl">{stage.emoji}</span>
                        <span>{stage.label}</span>
                        {isActive && lead?.status !== 'lost' && <span className="ml-auto animate-pulse text-lg">●</span>}
                        {isCompleted && lead?.status !== 'lost' && <span className="ml-auto text-lg">✓</span>}
                      </button>

                      {/* Connector */}
                      {idx < stages.length - 1 && (
                        <div
                          className={`h-3 my-2 rounded-full transition-all duration-300 ${
                            lead?.status === 'lost'
                              ? 'bg-red-300'
                              : isCompleted
                              ? 'bg-gradient-to-b from-emerald-400 to-emerald-300'
                              : 'bg-gray-200'
                          }`}
                        ></div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Status */}
              <div className="bg-white rounded-2xl p-4 border-2 border-gray-200 mb-6">
                <p className="text-xs font-bold text-gray-500 uppercase mb-2">Current Status</p>
                <p className="text-gray-900 font-bold text-xl capitalize">
                  {lead?.status === 'lost' ? '❌ Lost' : `${lead.status} 🎯`}
                </p>
              </div>

              {/* Buttons */}
              <div className="space-y-3">
                {/* Next Stage Button */}
                <button
                  onClick={handleNextStage}
                  disabled={!canAdvance}
                  className={`w-full py-4 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-2 text-lg border-2 ${
                    canAdvance
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-blue-400 hover:shadow-lg hover:scale-105 active:scale-95'
                      : lead?.status === 'lost'
                      ? 'bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed'
                      : 'bg-gradient-to-r from-emerald-400 to-green-500 text-white border-emerald-400'
                  }`}
                >
                  {canAdvance ? (
                    <>
                      Next Stage
                      <ChevronRight className="w-5 h-5" />
                    </>
                  ) : lead?.status === 'lost' ? (
                    'Lead Lost'
                  ) : (
                    '🎉 Converted!'
                  )}
                </button>

                {/* Mark as Lost Button */}
                {lead?.status !== 'lost' && (
                  <button
                    onClick={() => setShowLostConfirm(true)}
                    className="w-full py-4 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-2 text-lg border-2 bg-gradient-to-r from-red-400 to-red-500 text-white border-red-400 hover:shadow-lg hover:scale-105 active:scale-95"
                  >
                    <X className="w-5 h-5" />
                    Mark as Lost
                  </button>
                )}
              </div>
            </div>

            {/* Lost Confirmation Modal */}
            {showLostConfirm && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-xl">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Mark Lead as Lost?</h2>
                  <p className="text-gray-600 mb-6">
                    Are you sure you want to mark this lead as lost? This action will disable progression through the pipeline.
                  </p>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setShowLostConfirm(false)}
                      className="flex-1 py-3 rounded-xl font-semibold border-2 border-gray-300 text-gray-900 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleMarkLost}
                      className="flex-1 py-3 rounded-xl font-semibold bg-gradient-to-r from-red-500 to-red-600 text-white border-2 border-red-500 hover:shadow-lg transition-all"
                    >
                      Confirm Lost
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}