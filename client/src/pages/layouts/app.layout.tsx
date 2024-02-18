import NavbarComponent from '../../components/navbar.component';
import FooterComponent from '../../components/footer.component';

function AppLayout({ children }: any) {
    return (
        <>
            <header>
                <NavbarComponent />
            </header>
            <main className='py-4'>
                {children}
            </main>
            <footer>
                <FooterComponent />
            </footer>
        </>
    );
}

export default AppLayout;
