'use client'

import { useState, useEffect } from 'react'
import {
    Save,
    Loader2,
    Plus,
    Trash2,
    Megaphone,
    MapPin,
    CheckCircle2,
    ArrowRight,
    Sparkles
} from 'lucide-react'
import { toast } from 'sonner'
import { apiClient } from '@/lib/api-client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

export default function PromotionManager() {
    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        fetchPromotion()
    }, [])

    const fetchPromotion = async () => {
        try {
            const res = await apiClient.getPromotionData()
            setData(res)
        } catch (error) {
            console.error('Failed to fetch promotion:', error)
            toast.error('Failed to load promotion data')
        } finally {
            setLoading(false)
        }
    }

    const handleSave = async () => {
        setSaving(true)
        try {
            await apiClient.updatePromotionData(data)
            toast.success('Promotion data saved successfully!')
        } catch (error) {
            console.error('Save error:', error)
            toast.error('Failed to save changes')
        } finally {
            setSaving(false)
        }
    }

    // Generic list handlers
    const addListItem = (targetList: string) => {
        const newData = { ...data }
        if (targetList === 'whyPromote') newData.whyPromote.push('')
        if (targetList === 'cities') newData.cities.push('')
        if (targetList === 'celebrityManagement.types') newData.celebrityManagement.types.push('')
        if (targetList === 'celebrityManagement.includes') newData.celebrityManagement.includes.push('')
        if (targetList === 'benefits.whyChooseUs') newData.benefits.whyChooseUs.push('')
        if (targetList === 'benefits.strategicBenefits') newData.benefits.strategicBenefits.push('')
        setData(newData)
    }

    const removeListItem = (targetList: string, index: number) => {
        const newData = { ...data }
        const keys = targetList.split('.')
        let target = newData
        for (let i = 0; i < keys.length - 1; i++) {
            target = target[keys[i]]
        }
        target[keys[keys.length - 1]].splice(index, 1)
        setData(newData)
    }

    const updateListItem = (targetList: string, index: number, value: string) => {
        const newData = { ...data }
        const keys = targetList.split('.')
        let target = newData
        for (let i = 0; i < keys.length - 1; i++) {
            target = target[keys[i]]
        }
        target[keys[keys.length - 1]][index] = value
        setData(newData)
    }

    // Service handlers
    const addService = () => {
        setData({
            ...data,
            services: [...data.services, { title: '', items: [''] }]
        })
    }

    const removeService = (index: number) => {
        const newServices = [...data.services]
        newServices.splice(index, 1)
        setData({ ...data, services: newServices })
    }

    const addServiceItem = (sIndex: number) => {
        const newServices = [...data.services]
        newServices[sIndex].items.push('')
        setData({ ...data, services: newServices })
    }

    const removeServiceItem = (sIndex: number, iIndex: number) => {
        const newServices = [...data.services]
        newServices[sIndex].items.splice(iIndex, 1)
        setData({ ...data, services: newServices })
    }

    if (loading) return (
        <div className="h-64 flex items-center justify-center bg-card/50 rounded-3xl border border-border italic text-muted-foreground gap-3">
            <Loader2 className="w-5 h-5 animate-spin text-purple-600" />
            Synchronizing promotion core...
        </div>
    )

    if (!data) return (
        <div className="p-10 text-center bg-red-50 text-red-600 rounded-3xl border border-red-100">
            Failed to load promotion data. Please check connection.
        </div>
    )

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-card p-8 rounded-[2rem] shadow-sm border border-slate-100 dark:border-border ring-1 ring-slate-200/50 dark:ring-border/50">
                <div>
                    <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-foreground tracking-tight">Promotion <span className="text-slate-400 dark:text-muted-foreground font-light text-2xl ml-1">Manager</span></h2>
                    <p className="text-sm text-slate-500 dark:text-muted-foreground mt-1 font-medium italic">Control global reach and service descriptions dynamically.</p>
                </div>
                <Button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-purple-600 hover:bg-purple-700 text-white rounded-2xl px-8 py-7 h-auto shadow-xl shadow-purple-900/20 gap-3 font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                    {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5 border-2 border-white/20 rounded-md p-0.5" />}
                    Deploy Changes
                </Button>
            </div>

            <Tabs defaultValue="hero" className="w-full">
                <TabsList className="flex w-full bg-slate-100/30 dark:bg-muted/30 p-1.5 rounded-2xl border border-slate-200/50 dark:border-border mb-10 overflow-x-auto custom-scrollbar no-scrollbar">
                    {[
                        { v: 'hero', l: 'Hero & Intro', i: Sparkles },
                        { v: 'services', l: 'Core Services', i: Megaphone },
                        { v: 'celebrity', l: 'Celebrity Mgmt', i: MapPin },
                        { v: 'benefits', l: 'Strategic Benefits', i: CheckCircle2 },
                        { v: 'cities', l: 'Distribution', i: ArrowRight }
                    ].map(tab => (
                        <TabsTrigger
                            key={tab.v}
                            value={tab.v}
                            className="flex-1 rounded-xl data-[state=active]:bg-white dark:data-[state=active]:bg-muted data-[state=active]:text-purple-600 data-[state=active]:shadow-md font-bold py-4 text-[10px] uppercase tracking-widest gap-2 transition-all"
                        >
                            <tab.i size={14} className="opacity-50" />
                            {tab.l}
                        </TabsTrigger>
                    ))}
                </TabsList>

                <TabsContent value="hero" className="mt-6">
                    <Card>
                        <CardHeader><CardTitle>Hero Section</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold">Title</label>
                                <Input
                                    value={data.hero.title}
                                    onChange={(e) => setData({ ...data, hero: { ...data.hero, title: e.target.value } })}
                                    className="dark:bg-muted/50 dark:border-border"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold">Description</label>
                                <Textarea
                                    value={data.hero.description}
                                    onChange={(e) => setData({ ...data, hero: { ...data.hero, description: e.target.value } })}
                                    rows={4}
                                    className="dark:bg-muted/50 dark:border-border"
                                />
                            </div>

                            <div className="space-y-4 pt-6 border-t">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-bold">Why Promote in MP?</h3>
                                    <Button size="sm" variant="outline" onClick={() => addListItem('whyPromote')}>
                                        <Plus className="w-4 h-4 mr-1" /> Add Point
                                    </Button>
                                </div>
                                {data.whyPromote.map((item: string, i: number) => (
                                    <div key={i} className="flex gap-2">
                                        <Input value={item} onChange={(e) => updateListItem('whyPromote', i, e.target.value)} className="dark:bg-muted/50 dark:border-border" />
                                        <Button size="icon" variant="ghost" onClick={() => removeListItem('whyPromote', i)} className="text-red-500">
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="services" className="mt-6">
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-bold">Promotion Services</h3>
                            <Button onClick={addService} className="bg-indigo-600">
                                <Plus className="w-4 h-4 mr-2" /> Add New Service
                            </Button>
                        </div>
                        {data.services.map((service: any, sIndex: number) => (
                            <Card key={sIndex} className="relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500" />
                                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                                    <Input
                                        value={service.title}
                                        onChange={(e) => {
                                            const newServices = [...data.services]
                                            newServices[sIndex].title = e.target.value
                                            setData({ ...data, services: newServices })
                                        }}
                                        className="font-bold text-lg w-2/3 border-none bg-slate-50 dark:bg-muted focus:bg-white dark:focus:bg-muted/80"
                                        placeholder="Service Title"
                                    />
                                    <Button size="sm" variant="ghost" onClick={() => removeService(sIndex)} className="text-red-500">
                                        <Trash2 className="w-4 h-4 mr-2" /> Remove Service
                                    </Button>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center mb-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase">Items / Features</label>
                                            <Button size="sm" variant="outline" onClick={() => addServiceItem(sIndex)} className="h-7 text-xs">
                                                <Plus className="w-3 h-3 mr-1" /> Add Item
                                            </Button>
                                        </div>
                                        {service.items.map((item: string, iIndex: number) => (
                                            <div key={iIndex} className="flex gap-2">
                                                <Input
                                                    value={item}
                                                    onChange={(e) => {
                                                        const newServices = [...data.services]
                                                        newServices[sIndex].items[iIndex] = e.target.value
                                                        setData({ ...data, services: newServices })
                                                    }}
                                                    placeholder="Item description"
                                                    className="dark:bg-muted/50 dark:border-border"
                                                />
                                                <Button size="icon" variant="ghost" onClick={() => removeServiceItem(sIndex, iIndex)} className="h-10 w-10 text-slate-400">
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="celebrity" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader><CardTitle>Celebrity Types</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <Textarea
                                    value={data.celebrityManagement.description}
                                    onChange={(e) => setData({
                                        ...data,
                                        celebrityManagement: { ...data.celebrityManagement, description: e.target.value }
                                    })}
                                    rows={4}
                                    className="mb-4 dark:bg-muted/50 dark:border-border"
                                />
                                <div className="flex justify-between items-center">
                                    <h4 className="font-semibold text-sm">Artist Categories</h4>
                                    <Button size="sm" variant="outline" onClick={() => addListItem('celebrityManagement.types')}>
                                        <Plus className="w-4 h-4 mr-1" /> Add Type
                                    </Button>
                                </div>
                                {data.celebrityManagement.types.map((item: string, i: number) => (
                                    <div key={i} className="flex gap-2">
                                        <Input value={item} onChange={(e) => updateListItem('celebrityManagement.types', i, e.target.value)} className="dark:bg-muted/50 dark:border-border" />
                                        <Button size="icon" variant="ghost" onClick={() => removeListItem('celebrityManagement.types', i)} className="text-red-500">
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader><CardTitle>Management Includes</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <h4 className="font-semibold text-sm">Service Details</h4>
                                    <Button size="sm" variant="outline" onClick={() => addListItem('celebrityManagement.includes')}>
                                        <Plus className="w-4 h-4 mr-1" /> Add Inclusion
                                    </Button>
                                </div>
                                {data.celebrityManagement.includes.map((item: string, i: number) => (
                                    <div key={i} className="flex gap-2">
                                        <Input value={item} onChange={(e) => updateListItem('celebrityManagement.includes', i, e.target.value)} className="dark:bg-muted/50 dark:border-border" />
                                        <Button size="icon" variant="ghost" onClick={() => removeListItem('celebrityManagement.includes', i)} className="text-red-500">
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="benefits" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader><CardTitle>Why Choose Us?</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <h4 className="font-semibold text-sm">Core Advantages</h4>
                                    <Button size="sm" variant="outline" onClick={() => addListItem('benefits.whyChooseUs')}>
                                        <Plus className="w-4 h-4 mr-1" /> Add Benefit
                                    </Button>
                                </div>
                                {data.benefits.whyChooseUs.map((item: string, i: number) => (
                                    <div key={i} className="flex gap-2">
                                        <Input value={item} onChange={(e) => updateListItem('benefits.whyChooseUs', i, e.target.value)} className="dark:bg-muted/50 dark:border-border" />
                                        <Button size="icon" variant="ghost" onClick={() => removeListItem('benefits.whyChooseUs', i)} className="text-red-500">
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader><CardTitle>Strategic Benefits</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <h4 className="font-semibold text-sm">Producer Value</h4>
                                    <Button size="sm" variant="outline" onClick={() => addListItem('benefits.strategicBenefits')}>
                                        <Plus className="w-4 h-4 mr-1" /> Add Strategy
                                    </Button>
                                </div>
                                {data.benefits.strategicBenefits.map((item: string, i: number) => (
                                    <div key={i} className="flex gap-2">
                                        <Input value={item} onChange={(e) => updateListItem('benefits.strategicBenefits', i, e.target.value)} className="dark:bg-muted/50 dark:border-border" />
                                        <Button size="icon" variant="ghost" onClick={() => removeListItem('benefits.strategicBenefits', i)} className="text-red-500">
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="cities" className="mt-6">
                    <Card>
                        <CardHeader><CardTitle>Promotion-Friendly Cities</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h4 className="font-semibold text-sm">Major Locations</h4>
                                <Button size="sm" variant="outline" onClick={() => addListItem('cities')}>
                                    <Plus className="w-4 h-4 mr-1" /> Add City
                                </Button>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {data.cities.map((city: string, i: number) => (
                                    <div key={i} className="flex gap-2">
                                        <Input value={city} onChange={(e) => updateListItem('cities', i, e.target.value)} className="dark:bg-muted/50 dark:border-border" />
                                        <Button size="icon" variant="ghost" onClick={() => removeListItem('cities', i)} className="text-red-500 shrink-0">
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
