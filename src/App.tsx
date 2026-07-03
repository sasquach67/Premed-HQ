import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { Home } from '@/pages/Home'
import { Academics } from '@/pages/Academics'
import { Mcat } from '@/pages/Mcat'
import { Letters } from '@/pages/Letters'
import { ExperiencePillar } from '@/pages/ExperiencePillar'
import { Extracurriculars } from '@/pages/Extracurriculars'
import { Essays } from '@/pages/Essays'
import { Schools } from '@/pages/Schools'
import { Timeline } from '@/pages/Timeline'
import { Profile } from '@/pages/Profile'
import { Help } from '@/pages/Help'
import { Settings } from '@/pages/Settings'

// HashRouter keeps deep links working on any static host (no server rewrites).
function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<Home />} />
          <Route path="northstar" element={<Navigate to="/?guide=open" replace />} />
          <Route path="academics" element={<Academics />} />
          <Route path="mcat" element={<Mcat />} />
          <Route path="letters" element={<Letters />} />
          <Route path="clinical" element={<ExperiencePillar key="clinical" category="clinical" />} />
          <Route path="volunteering" element={<ExperiencePillar key="volunteering" category="volunteering" />} />
          <Route path="shadowing" element={<ExperiencePillar key="shadowing" category="shadowing" />} />
          <Route path="research" element={<ExperiencePillar key="research" category="research" />} />
          <Route path="ecs" element={<Extracurriculars />} />
          <Route path="essays" element={<Essays />} />
          <Route path="schools" element={<Schools />} />
          <Route path="timeline" element={<Timeline />} />
          <Route path="archive" element={<Navigate to="/settings?tab=archive" replace />} />
          <Route path="profile" element={<Profile />} />
          <Route path="help" element={<Help />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
