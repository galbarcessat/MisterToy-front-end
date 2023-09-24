import toyLogo from '../assets/img/toyLogo.png'


export function HomePage() {

    return (
        <section className='home-page-container'>
            <h2>Home Page!</h2>
            <img className='home-logo' src={toyLogo} alt="" />
        </section >
    )
}