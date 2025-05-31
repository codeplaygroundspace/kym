"use client";

import { useState } from "react";
import Navbar from "@/components/common/nav-bar";
import SearchBar from "@/components/features/search-bar";
import WisdomTabs from "@/components/features/wisdom-tabs";
import ExpertCard from "@/components/features/expert-card";
import CourseCard from "@/components/features/course-card";
import ContentSection from "@/components/features/content-section";
import {
  experts,
  pregnancyWellnessCourses,
  mentalHealthCourses,
  birthPrepCourses,
  Expert,
  Course,
} from "@/data/wisdom-data";

const WisdomPage = () => {
  const [activeTab, setActiveTab] = useState("discover");

  const handleExpertClick = (expert: Expert) => {
    console.log("Expert clicked:", expert);
  };

  const handleCourseClick = (course: Course) => {
    console.log("Course clicked:", course);
  };

  const handleSearch = (query: string) => {
    console.log("Search query:", query);
    // TODO: Implement search functionality
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <main className="pb-20">
        <div className="container mx-auto px-4 pt-10 max-w-md">
          <h1 className="text-2xl font-bold text-text-primary mb-6">Wisdom</h1>

          <SearchBar
            placeholder="Pregnancy tips, birth prep, mental health..."
            onSearch={handleSearch}
          />

          <WisdomTabs activeTab={activeTab} onTabChange={handleTabChange} />

          {activeTab === "discover" && (
            <>
              {/* Expert Insights Section */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-text-primary mb-4">
                  Expert Insights
                </h2>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {experts.map((expert) => (
                    <div key={expert.id} className="flex-shrink-0 w-48">
                      <ExpertCard expert={expert} onClick={handleExpertClick} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Pregnancy Wellness Section */}
              <ContentSection title="Pregnancy Wellness">
                {pregnancyWellnessCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    onClick={handleCourseClick}
                  />
                ))}
              </ContentSection>

              {/* Mental Health & Relaxation Section */}
              <ContentSection title="Mental Health & Relaxation">
                {mentalHealthCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    onClick={handleCourseClick}
                  />
                ))}
              </ContentSection>

              {/* Birth Preparation Section */}
              <ContentSection title="Birth Preparation">
                {birthPrepCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    onClick={handleCourseClick}
                  />
                ))}
              </ContentSection>
            </>
          )}

          {activeTab === "saved" && (
            <div className="text-center py-12">
              <p className="text-text-secondary">No saved content yet</p>
              <p className="text-sm text-text-muted mt-2">
                Bookmark helpful pregnancy articles and courses to access them
                here
              </p>
            </div>
          )}

          {activeTab === "watch" && (
            <div className="text-center py-12">
              <p className="text-text-secondary">Your watch history</p>
              <p className="text-sm text-text-muted mt-2">
                Recently watched pregnancy videos and courses will appear here
              </p>
            </div>
          )}

          {activeTab === "discharge" && (
            <div className="text-center py-12">
              <p className="text-text-secondary">Hospital discharge planning</p>
              <p className="text-sm text-text-muted mt-2">
                Essential information for going home with your baby
              </p>
            </div>
          )}
        </div>
      </main>
      <Navbar />
    </div>
  );
};

export default WisdomPage;
