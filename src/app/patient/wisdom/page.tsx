"use client";

import Navbar from "@/components/common/nav-bar";
import PageHeader from "@/components/common/page-header";
import { FileText } from "lucide-react";

const WisdomPage = () => {
  return (
    <div className="min-h-screen bg-bg-secondary">
      <main className="pb-20">
        <div className="container mx-auto px-4 pt-10 max-w-md">
          <PageHeader title="Wisdom" showTitle />

          {/* Empty State */}
          <div className="flex flex-col items-center justify-center py-16 px-6">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
              <FileText className="w-8 h-8 text-text-muted" />
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              No Notes Yet
            </h3>
            <p className="text-text-muted text-center max-w-sm">
              Practitioner notes will be displayed here
            </p>
          </div>
        </div>
      </main>
      <Navbar />
    </div>
  );
};

export default WisdomPage;
