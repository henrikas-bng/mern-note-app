import Navbar from '../../components/navbar';
import Footer from '../../components/footer';

function AppLayout({ children }: any) {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main className='pt-8 pb-16'>
                {children}
            </main>
            <Footer />
        </>
    );
}

export default AppLayout;
