"use client";

import React, { useState } from "react";
import {
  Search,
  Bell,
  User,
  TriangleAlert,
  TrendingUp,
  TrendingDown,
  MessageSquare,
} from "lucide-react";
import {
  mockPatients,
  getStatusColor,
  getEntryColor,
  filterPatients,
  getPatientStats,
  type FilterType,
  type Patient,
} from "@/data/practitioner-data";

const PractitionerDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("all");

  const filteredPatients = filterPatients(
    mockPatients,
    searchTerm,
    selectedFilter
  );
  const stats = getPatientStats(mockPatients);

  const getTrendIcon = (trend: Patient["trend"]) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <div className="w-4 h-4" />;
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterClick = (filter: FilterType) => {
    setSelectedFilter(filter);
  };

  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      action();
    }
  };

  return (
    <div className="min-h-screen bg-bg-secondary">
      {/* Mobile Header */}
      <header className="bg-bg-primary shadow-sm sticky top-0 z-10">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold text-text-primary">
                My Patients
              </h1>
              <p className="text-sm text-text-secondary">
                {filteredPatients.length} patients
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <div
                className="relative"
                role="button"
                tabIndex={0}
                aria-label="Notifications"
                onKeyDown={(e) =>
                  handleKeyDown(e, () => {
                    /* TODO: Handle notifications */
                  })
                }
              >
                <Bell className="w-6 h-6 text-text-secondary" />
                {stats.flagged > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                    {stats.flagged}
                  </span>
                )}
              </div>
              <div
                className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center"
                role="button"
                tabIndex={0}
                aria-label="User profile"
                onKeyDown={(e) =>
                  handleKeyDown(e, () => {
                    /* TODO: Handle profile */
                  })
                }
              >
                <User className="w-5 h-5 text-blue-600 dark:text-blue-300" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Quick Stats */}
      <div className="px-4 py-4">
        <div className="grid grid-cols-4 gap-2">
          <div className="bg-bg-primary rounded-2xl p-3 text-center">
            <p className="text-lg font-bold text-text-primary">{stats.total}</p>
            <p className="text-xs text-text-muted">Total</p>
          </div>
          <div className="bg-bg-primary rounded-2xl p-3 text-center">
            <p className="text-lg font-bold text-red-600">{stats.flagged}</p>
            <p className="text-xs text-text-muted">Flagged</p>
          </div>
          <div className="bg-bg-primary rounded-2xl p-3 text-center">
            <p className="text-lg font-bold text-green-600">{stats.active}</p>
            <p className="text-xs text-text-muted">Active</p>
          </div>
          <div className="bg-bg-primary rounded-2xl p-3 text-center">
            <p className="text-lg font-bold text-orange-600">
              {stats.inactive}
            </p>
            <p className="text-xs text-text-muted">Inactive</p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="px-4 pb-4">
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted w-5 h-5" />
            <input
              type="text"
              placeholder="Search patients..."
              className="w-full pl-10 pr-4 py-3 bg-bg-primary border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base text-text-primary placeholder:text-text-muted"
              value={searchTerm}
              onChange={handleSearchChange}
              aria-label="Search patients"
            />
          </div>

          {/* Filter Chips */}
          <div className="flex space-x-2 overflow-x-auto pb-1">
            <button
              onClick={() => handleFilterClick("all")}
              onKeyDown={(e) =>
                handleKeyDown(e, () => handleFilterClick("all"))
              }
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedFilter === "all"
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                  : "bg-bg-primary text-text-secondary border border-gray-200 dark:border-gray-700"
              }`}
              aria-label="Show all patients"
            >
              All
            </button>
            <button
              onClick={() => handleFilterClick("flagged")}
              onKeyDown={(e) =>
                handleKeyDown(e, () => handleFilterClick("flagged"))
              }
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedFilter === "flagged"
                  ? "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300"
                  : "bg-bg-primary text-text-secondary border border-gray-200 dark:border-gray-700"
              }`}
              aria-label={`Show flagged patients (${stats.flagged})`}
            >
              🚨 Flagged ({stats.flagged})
            </button>
            <button
              onClick={() => handleFilterClick("recent")}
              onKeyDown={(e) =>
                handleKeyDown(e, () => handleFilterClick("recent"))
              }
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedFilter === "recent"
                  ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                  : "bg-bg-primary text-text-secondary border border-gray-200 dark:border-gray-700"
              }`}
              aria-label="Show patients active today"
            >
              Active Today
            </button>
            <button
              onClick={() => handleFilterClick("inactive")}
              onKeyDown={(e) =>
                handleKeyDown(e, () => handleFilterClick("inactive"))
              }
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedFilter === "inactive"
                  ? "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300"
                  : "bg-bg-primary text-text-secondary border border-gray-200 dark:border-gray-700"
              }`}
              aria-label={`Show inactive patients (${stats.inactive})`}
            >
              Inactive ({stats.inactive})
            </button>
          </div>
        </div>
      </div>

      {/* Patient List */}
      <div className="px-4 space-y-3 pb-6">
        {filteredPatients.map((patient) => (
          <div
            key={patient.id}
            className="bg-bg-primary rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden active:bg-gray-50 dark:active:bg-gray-800 transition-colors cursor-pointer"
            role="button"
            tabIndex={0}
            aria-label={`View details for ${patient.name}`}
            onKeyDown={(e) =>
              handleKeyDown(e, () => {
                /* TODO: Navigate to patient detail */
              })
            }
            onClick={() => {
              /* TODO: Navigate to patient detail */
            }}
          >
            {/* Main Patient Info */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {/* Patient Avatar */}
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-700 dark:text-blue-300 font-semibold text-sm">
                      {patient.initials}
                    </span>
                  </div>

                  {/* Patient Info */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-text-primary text-base">
                        {patient.name}
                      </h3>
                      {patient.flagged && (
                        <TriangleAlert
                          className="w-4 h-4 text-red-500 flex-shrink-0"
                          aria-label="Flagged patient"
                        />
                      )}
                      {patient.hasMessages && (
                        <MessageSquare
                          className="w-4 h-4 text-blue-500 flex-shrink-0"
                          aria-label="Has messages"
                        />
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          patient.status,
                          patient.weeksOfStrength
                        )}`}
                      >
                        {patient.weeksOfStrength}w{" "}
                        {patient.status === "Pregnant"
                          ? "pregnancy"
                          : "postpartum"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Time & Trend */}
                <div className="text-right flex-shrink-0">
                  <div className="flex items-center space-x-1 mb-1">
                    <p className="text-sm text-text-secondary">
                      {patient.lastEntry}
                    </p>
                    {getTrendIcon(patient.trend)}
                  </div>
                  {patient.daysSinceLastEntry > 2 && (
                    <p className="text-xs text-orange-600">
                      ⚠️ {patient.daysSinceLastEntry}d silent
                    </p>
                  )}
                </div>
              </div>

              {/* Current Mood */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <span
                    className="text-2xl"
                    role="img"
                    aria-label={`Mood: ${patient.moodEmoji}`}
                  >
                    {patient.moodEmoji}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-text-primary">
                      Latest mood
                    </p>
                    <p className="text-xs text-text-muted">
                      Energy: {patient.energy}/5
                    </p>
                  </div>
                </div>
              </div>

              {/* Latest Note */}
              {patient.lastNote && (
                <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
                  <p className="text-sm text-text-secondary italic">
                    &ldquo;{patient.lastNote}&rdquo;
                  </p>
                </div>
              )}
            </div>

            {/* Recent Entries Timeline */}
            {patient.recentEntries.length > 1 && (
              <div className="px-4 pb-3">
                <p className="text-xs text-text-muted mb-2">Recent entries:</p>
                <div className="space-y-2">
                  {patient.recentEntries.slice(0, 2).map((entry, index) => (
                    <div
                      key={index}
                      className={`pl-3 border-l-2 ${getEntryColor(
                        entry.color
                      )}`}
                    >
                      <div className="flex items-center space-x-2">
                        <span
                          className="text-sm"
                          role="img"
                          aria-label={`Mood: ${entry.emoji}`}
                        >
                          {entry.emoji}
                        </span>
                        <span className="text-xs text-text-muted">
                          {entry.date}
                        </span>
                      </div>
                      <p className="text-xs text-text-secondary mt-1">
                        {entry.note}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        {filteredPatients.length === 0 && (
          <div className="bg-bg-primary rounded-2xl p-8 text-center">
            <p className="text-text-secondary">No patients found</p>
            <p className="text-sm text-text-muted mt-1">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PractitionerDashboard;
