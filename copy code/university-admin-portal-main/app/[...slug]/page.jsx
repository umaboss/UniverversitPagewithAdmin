'use client';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import Layout from "@/components/Layout";
import { useParams } from "next/navigation";
import { Suspense } from "react";

// Import all page components
import Dashboard from "@/pages/Dashboard";
import LevelEducationList from "@/pages/LevelEducation/LevelEducationList";
import AddLevelEducation from "@/pages/LevelEducation/AddLevelEducation";
import CreateAdmin from "@/pages/AdminRegister/CreateAdmin";
import AdminList from "@/pages/AdminRegister/AdminList";
import UniversityList from "@/pages/University/UniversityList";
import AddUniversity from "@/pages/University/AddUniversity";
import UniversityCountries from "@/pages/University/UniversityCountries";
import CountriesList from "@/pages/Countries/CountriesList";
import AddCountry from "@/pages/Countries/AddCountry";
import CourseList from "@/pages/Course/CourseList";
import AddCourse from "@/pages/Course/AddCourse";
import SubjectList from "@/pages/Course/SubjectList";
import AddSubject from "@/pages/Course/AddSubject";
import SubjectAdded from "@/pages/Course/SubjectAdded";
import FreeConsultationList from "@/pages/FreeConsultation/FreeConsultationList";
import ApplyNowList from "@/pages/FreeConsultation/ApplyNowList";
import CommentList from "@/pages/Comments/CommentList";
import JobPosts from "@/pages/JobPosts";
import AddJobs from "@/pages/JobPosts/AddJobs";
import StudentList from "@/pages/Student/StudentList";
import ConsultantList from "@/pages/ConsultantList";
import GuideList from "@/pages/GuideList";
import AddGuide from "@/pages/Guide/AddGuide";
import PagesList from "@/pages/PagesList";
import AddArticle from "@/pages/Articles/AddArticle";
import ArticleList from "@/pages/Articles/ArticleList";
import CategoryList from "@/pages/Articles/CategoryList";
import ContactMessages from "@/pages/ContactMessages";
import VisaCountryList from "@/pages/VisitVisa/VisaCountryList";
import VisaDetails from "@/pages/VisitVisa/VisaDetails";
import Settings from "@/pages/Settings";
import InboxContact from "@/pages/Inbox/InboxContact";
import InboxComplaints from "@/pages/Inbox/InboxComplaints";
import UniversityLogs from "@/pages/University/UniversityLogs";
import CourseLogs from "@/pages/University/CourseLogs";
import Conversations from "@/pages/Conversations";
import { UserProvider } from "@/pages/UserContext";
import UserList from "@/pages/UserList";
import { GuideListProvider } from "@/pages/GuideContext";
import { ArticleProvider } from "@/pages/ArticleContext";
import { JobProvider } from "@/pages/JobPosts/JobContext";
import WhatsAppEvents from "@/pages/EventsTrigger/WhatsAppEvents";

const queryClient = new QueryClient();

// Page mapping
const pageComponents = {
  '': Dashboard,
  'dashboard': Dashboard,
  'level-education': LevelEducationList,
  'level-education/add': AddLevelEducation,
  'admin-register/create': CreateAdmin,
  'admin-register/list': AdminList,
  'university': UniversityList,
  'university/add': AddUniversity,
  'university/countries': UniversityCountries,
  'countries': CountriesList,
  'countries/add': AddCountry,
  'course': CourseList,
  'course/add': AddCourse,
  'course/subjects': SubjectList,
  'course/subjects/add': AddSubject,
  'course/subjects/added': SubjectAdded,
  'free-consultation': FreeConsultationList,
  'free-consultation/apply': ApplyNowList,
  'comments': CommentList,
  'job-posts': JobPosts,
  'job-posts/add': AddJobs,
  'student': StudentList,
  'consultant': ConsultantList,
  'guide': GuideList,
  'guide/add': AddGuide,
  'pages': PagesList,
  'articles/add': AddArticle,
  'articles': ArticleList,
  'articles/categories': CategoryList,
  'contact-message': ContactMessages,
  'visit-visa/country': VisaCountryList,
  'visit-visa/details': VisaDetails,
  'settings': Settings,
  'inbox/contact': InboxContact,
  'inbox/complaints': InboxComplaints,
  'university-contacts/logs': UniversityLogs,
  'university-contacts/course-logs': CourseLogs,
  'user-management': UserList,
  'events-trigger/whatsapp': WhatsAppEvents,
  'conversations': Conversations,
};

function PageContent() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug.join('/') : '';
  
  const PageComponent = pageComponents[slug];
  
  if (!PageComponent) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-8">Page Not Found</p>
          <p className="text-gray-500">The page you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  // Wrap specific components with their providers
  if (slug === 'user-management') {
    return (
      <UserProvider>
        <PageComponent />
      </UserProvider>
    );
  }

  if (slug === 'guide' || slug === 'guide/add') {
    return (
      <GuideListProvider>
        <PageComponent />
      </GuideListProvider>
    );
  }

  if (slug === 'articles/add' || slug === 'articles' || slug === 'articles/categories') {
    return (
      <ArticleProvider>
        <PageComponent />
      </ArticleProvider>
    );
  }

  if (slug === 'job-posts' || slug === 'job-posts/add') {
    return (
      <JobProvider>
        <PageComponent />
      </JobProvider>
    );
  }

  return <PageComponent />;
}

export default function DynamicPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster>
          <Sonner>
            <Layout>
              <Suspense fallback={<div>Loading...</div>}>
                <PageContent />
              </Suspense>
            </Layout>
          </Sonner>
        </Toaster>
      </TooltipProvider>
    </QueryClientProvider>
  );
} 