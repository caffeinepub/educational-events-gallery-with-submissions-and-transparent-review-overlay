import { useState } from 'react';
import { SiteLayout } from './components/layout/SiteLayout';
import { EventsGalleryPage } from './pages/EventsGalleryPage';
import { SubmitEventPage } from './pages/SubmitEventPage';

type View = 'gallery' | 'submit';

function App() {
  const [currentView, setCurrentView] = useState<View>('gallery');

  return (
    <SiteLayout currentView={currentView} onNavigate={setCurrentView}>
      {currentView === 'gallery' && <EventsGalleryPage onSubmitClick={() => setCurrentView('submit')} />}
      {currentView === 'submit' && <SubmitEventPage onSuccess={() => setCurrentView('gallery')} onCancel={() => setCurrentView('gallery')} />}
    </SiteLayout>
  );
}

export default App;
