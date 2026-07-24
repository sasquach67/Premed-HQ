import { Check, Crown } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export function Upgrade() {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <PageHeader
        title="Premed HQ Plus"
        subtitle="Preview the planned upgrade. Billing is not connected in this foundation release."
      />
      <div className="mx-auto max-w-3xl">
        <Card className="border-primary/25">
          <CardContent className="p-6 sm:p-8">
            <Crown className="size-8 text-primary" />
            <h2 className="mt-4 font-display text-lg font-semibold">Plus preview</h2>
            <div className="mt-5 space-y-3 text-sm">
              {['Deeper application insights', 'Expanded backup and collaboration options', 'Future Atlas intelligence features'].map((item) => (
                <p key={item} className="flex items-center gap-2"><Check className="size-4 text-primary" /> {item}</p>
              ))}
            </div>
            <Button className="mt-7" disabled>Billing opens in a future release</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
