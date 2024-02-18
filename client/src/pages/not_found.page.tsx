import AppLayout from './layouts/app.layout';

function NotFoundPage() {
    return (
        <AppLayout>
            <div className='container mx-auto px-4'>
                <p>404 Page Not Found!</p>
            </div>
        </AppLayout>
    );
}

export default NotFoundPage;
