import { observer } from "mobx-react-lite";

export default observer(function AboutPage() {
    return (
        <>
            <header>
                <h1 className="diamond">ABOUT</h1>
            </header>
            <div id="About" className="ui stackable grid">
                <div className="three column row">
                    <div className="column text-center">
                        <i className="bug huge icon aboutIcon"></i>
                        <h2 className="ui big header">Track Defects</h2>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora doloribus ab enim cum nobis
        obcaecati aut, vitae laborum reprehenderit officia?</p>
                    </div>
                    <div className="column text-center">
                        <i className="handshake outline huge icon aboutIcon"></i>
                        <h2 className="ui big header">Teamwork</h2>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora doloribus ab enim cum nobis
        obcaecati aut, vitae laborum reprehenderit officia?</p>
                    </div>
                    <div className="column text-center">
                        <i className="comment outline huge icon aboutIcon"></i>
                        <h2 className="ui big header">Live Chat</h2>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora doloribus ab enim cum nobis
        obcaecati aut, vitae laborum reprehenderit officia?</p>
                    </div>
                </div>
                <div className="three column row">
                    <div className="column text-center">
                        <i className="archive huge icon aboutIcon"></i>
                        <h2 className="ui big header">Performance History</h2>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora doloribus ab enim cum nobis
        obcaecati aut, vitae laborum reprehenderit officia?</p>
                    </div>
                    <div className="column text-center">
                        <i className="filter huge icon aboutIcon"></i>
                        <h2 className="ui big header">Filter</h2>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora doloribus ab enim cum nobis
        obcaecati aut, vitae laborum reprehenderit officia?</p>
                    </div>
                    <div className="column text-center">
                        <i className="computer huge icon aboutIcon"></i>
                        <h2 className="ui big header">Fully Responsive</h2>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora doloribus ab enim cum nobis
        obcaecati aut, vitae laborum reprehenderit officia?</p>
                    </div>
                </div>
            </div>
        </>
    )
})
