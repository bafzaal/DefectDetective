import { observer } from "mobx-react-lite";

export default observer(function AboutPage() {
    return (
        <>
            <header>
                <h1 className="diamond">ABOUT</h1>
            </header>
            <div id="About" className="ui stackable grid">
                <div className="three column row">
                    <div className="column">
                        <i className="laptop huge icon"></i>
                        <h2 className="ui big header">Fully Responsive</h2>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora doloribus ab enim cum nobis
        obcaecati aut, vitae laborum reprehenderit officia?</p>
                    </div>
                    <div className="column">
                        <i className="clock huge icon"></i>
                        <h2 className="ui big header">Powerfull Admin</h2>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora doloribus ab enim cum nobis
        obcaecati aut, vitae laborum reprehenderit officia?</p>
                    </div>
                    <div className="column">
                        <i className="world huge icon"></i>
                        <h2 className="ui big header">Multi Language</h2>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora doloribus ab enim cum nobis
        obcaecati aut, vitae laborum reprehenderit officia?</p>
                    </div>
                </div>
                <div className="three column row">
                    <div className="column">
                        <i className="search huge icon"></i>
                        <h2 className="ui big header">Redius Search</h2>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora doloribus ab enim cum nobis
        obcaecati aut, vitae laborum reprehenderit officia?</p>
                    </div>
                    <div className="column">
                        <i className="id badge huge icon"></i>
                        <h2 className="ui big header">Powerfull Admin</h2>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora doloribus ab enim cum nobis
        obcaecati aut, vitae laborum reprehenderit officia?</p>
                    </div>
                    <div className="column">
                        <i className="language huge icon"></i>
                        <h2 className="ui big header">Multi Language</h2>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora doloribus ab enim cum nobis
        obcaecati aut, vitae laborum reprehenderit officia?</p>
                    </div>
                </div>
            </div>
        </>
    )
})
