# MPSC Library AI

A functional MVP for a free MPSC study-material community.

### Current functionality
- Public approved-material library
- Search and filters
- PDF upload with validation
- Pending moderation workflow
- Local admin moderation page at /admin
- Download of uploaded PDFs in the same browser
- Responsive UI

### Important
The current MVP stores uploaded PDFs in browser localStorage. This makes the workflow functional for testing, but it is **not yet multi-user cloud storage**. For a real public platform, connect PostgreSQL + object storage + authentication before launch.

### Production architecture
Next.js + PostgreSQL + object storage (Vercel Blob/S3-compatible) + authentication + admin role + optional AI/RAG.
