import { motion } from 'motion/react';
import { User, Bell, CreditCard, Download } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { PrimaryButton } from '../components/PrimaryButton';

export function Settings() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white pt-24 pb-16 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-5xl font-semibold text-[#1A1F36] mb-2">Settings</h1>
          <p className="text-xl text-[#6B7280]">Manage your account and preferences</p>
        </motion.div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-8 p-1 bg-white border border-gray-200 rounded-[16px] inline-flex">
            <TabsTrigger value="profile" className="px-6 py-3 rounded-[12px]">Profile</TabsTrigger>
            <TabsTrigger value="api" className="px-6 py-3 rounded-[12px]">API Keys</TabsTrigger>
            <TabsTrigger value="notifications" className="px-6 py-3 rounded-[12px]">Notifications</TabsTrigger>
            <TabsTrigger value="billing" className="px-6 py-3 rounded-[12px]">Billing</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <div className="p-8 rounded-[24px] bg-white border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
              <h3 className="text-2xl font-semibold text-[#1A1F36] mb-6">Profile Information</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[#1A1F36] mb-2">Full Name</label>
                  <input type="text" defaultValue="John Doe" className="w-full px-4 py-3 rounded-[16px] border border-gray-200 focus:border-[#10B981] focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1A1F36] mb-2">Email</label>
                  <input type="email" defaultValue="john@example.com" className="w-full px-4 py-3 rounded-[16px] border border-gray-200 focus:border-[#10B981] focus:outline-none" />
                </div>
                <PrimaryButton>Save Changes</PrimaryButton>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="api">
            <div className="p-8 rounded-[24px] bg-white border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
              <h3 className="text-2xl font-semibold text-[#1A1F36] mb-6">API Keys</h3>
              <div className="p-4 rounded-[16px] bg-gray-50 mb-4">
                <code className="text-sm text-[#1A1F36]">sk_live_••••••••••••••••••••1234</code>
              </div>
              <PrimaryButton>Generate New Key</PrimaryButton>
            </div>
          </TabsContent>

          <TabsContent value="notifications">
            <div className="p-8 rounded-[24px] bg-white border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
              <h3 className="text-2xl font-semibold text-[#1A1F36] mb-6">Notification Preferences</h3>
              <div className="space-y-4">
                {[
                  { label: 'Email notifications', checked: true },
                  { label: 'Scan completion alerts', checked: true },
                  { label: 'Weekly reports', checked: false }
                ].map((item) => (
                  <label key={item.label} className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked={item.checked} className="rounded" />
                    <span className="text-[#1A1F36]">{item.label}</span>
                  </label>
                ))}
              </div>
              <div className="mt-6">
                <PrimaryButton>Save Preferences</PrimaryButton>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="billing">
            <div className="p-8 rounded-[24px] bg-white border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
              <h3 className="text-2xl font-semibold text-[#1A1F36] mb-6">Billing & Subscription</h3>
              <div className="mb-6">
                <p className="text-[#6B7280] mb-2">Current Plan: <span className="text-[#1A1F36] font-semibold">Pro</span></p>
                <p className="text-[#6B7280]">Next billing date: January 19, 2024</p>
              </div>
              <div className="flex gap-4">
                <PrimaryButton>Upgrade Plan</PrimaryButton>
                <button className="px-6 py-3 text-[#DC2626] hover:underline">Cancel Subscription</button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
