
// Use relative paths to use the Next.js API proxy
const PROXY_URL = '/api';
const EXTERNAL_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface ContactData {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

export interface ApplicationData {
    fullName: string;
    email: string;
    phone: string;
    productionCompany: string;
    projectTitle: string;
    projectType: string;
    preferredLocation: string;
    estimatedBudget: string;
    additionalNotes: string;
}

export const apiClient = {
    healthCheck: async () => {
        const res = await fetch('/api/health');
        return res.json();
    },

    submitContact: async (data: ContactData) => {
        const res = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || 'Failed to submit contact form');
        }
        return res.json();
    },

    submitApplication: async (data: ApplicationData) => {
        const res = await fetch('/api/apply', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || 'Failed to submit application');
        }
        return res.json();
    },

    // Admin endpoints (Secured by Middleware)
    getAllContacts: async () => {
        const res = await fetch('/api/admin/contacts');
        if (!res.ok) throw new Error('Failed to fetch contacts');
        return res.json();
    },

    getAllApplications: async () => {
        const res = await fetch('/api/admin/applications');
        if (!res.ok) throw new Error('Failed to fetch applications');
        return res.json();
    },

    // Document Management
    uploadDocument: async (file: File, type: string, title: string, buttonLabel: string) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', type);
        formData.append('title', title);
        formData.append('buttonLabel', buttonLabel);

        const res = await fetch('/api/documents/upload', {
            method: 'POST',
            body: formData,
        });
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || 'Failed to upload document');
        }
        return res.json();
    },

    getAllDocuments: async (type?: string) => {
        const url = type ? `/api/documents?type=${type}` : '/api/documents';
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch documents');
        return res.json();
    },

    updateDocument: async (id: number, data: { title?: string; buttonLabel?: string }) => {
        const res = await fetch(`/api/documents/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || 'Failed to update document');
        }
        return res.json();
    },

    deleteDocument: async (id: number) => {
        const res = await fetch(`/api/documents/${id}`, {
            method: 'DELETE',
        });
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || 'Failed to delete document');
        }
        return res.json();
    },

    // Subsidy Page Content Management
    getSubsidyContent: async () => {
        const res = await fetch('/api/content/subsidy', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch subsidy content');
        return res.json();
    },

    updateSubsidyContent: async (data: any) => {
        const res = await fetch('/api/content/subsidy', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || 'Failed to update content');
        }
        return res.json();
    },

    // Gallery Management
    getGalleryData: async () => {
        const res = await fetch('/api/gallery', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch gallery data');
        return res.json();
    },

    updateGalleryData: async (data: any) => {
        const res = await fetch('/api/gallery', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Failed to update gallery data');
        return res.json();
    },

    uploadGalleryImage: async (formData: FormData) => {
        const res = await fetch('/api/gallery/upload', {
            method: 'POST',
            body: formData,
        });
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || 'Failed to upload image');
        }
        return res.json();
    },

    updateGalleryItem: async (id: string, data: any) => {
        const res = await fetch(`/api/gallery/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || 'Failed to update item');
        }
        return res.json();
    },

    deleteGalleryItem: async (id: string) => {
        const res = await fetch(`/api/gallery/${id}`, {
            method: 'DELETE',
        });
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || 'Failed to delete item');
        }
        return res.json();
    },

    // About Page Management
    getAboutData: async () => {
        const res = await fetch('/api/about', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch about data');
        return res.json();
    },

    updateAboutData: async (data: any) => {
        const res = await fetch('/api/about', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || 'Failed to update about data');
        }
        return res.json();
    },

    // Social Media Management
    getSocialData: async () => {
        const res = await fetch('/api/social', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch social data');
        return res.json();
    },

    updateSocialData: async (data: any) => {
        const res = await fetch('/api/social', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || 'Failed to update social data');
        }
        return res.json();
    },

    // Promotion Management
    getPromotionData: async () => {
        const res = await fetch('/api/promotion', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch promotion data');
        return res.json();
    },

    updatePromotionData: async (data: any) => {
        const res = await fetch('/api/promotion', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || 'Failed to update promotion data');
        }
        return res.json();
    }
};
