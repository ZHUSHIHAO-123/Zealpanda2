import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import LoginScreen from "pages/login-screen";
import MainChatInterface from "pages/main-chat-interface";
import RegistrationScreen from "pages/registration-screen";
import SettingsScreen from "pages/settings-screen";
import ShortStoriesListScreen from "pages/short-stories-list-screen";
import StoryDetailScreen from "pages/story-detail-screen";
import NavigationMenuComponent from "pages/navigation-menu-component";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<MainChatInterface />} />
        <Route path="/login-screen" element={<LoginScreen />} />
        <Route path="/main-chat-interface" element={<MainChatInterface />} />
        <Route path="/registration-screen" element={<RegistrationScreen />} />
        <Route path="/settings-screen" element={<SettingsScreen />} />
        <Route path="/short-stories" element={<ShortStoriesListScreen />} />
        <Route path="/short-stories-list-screen" element={<ShortStoriesListScreen />} />
        <Route path="/story-detail-screen" element={<StoryDetailScreen />} />
        <Route path="/navigation-menu-component" element={<NavigationMenuComponent />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;