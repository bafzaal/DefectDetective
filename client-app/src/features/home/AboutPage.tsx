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
                        <p>Defect Detective provides a platform to organize and systemize defects with your team
                            while concurrently serving as a social media app. </p>
                    </div>
                    <div className="column text-center">
                        <i className="handshake outline huge icon aboutIcon"></i>
                        <h2 className="ui big header">Teamwork</h2>
                        <p> Work with your team to analyze and update the status of all defects.
                            Manage relationships by following other team members and viewing their profiles. </p>
                    </div>
                    <div className="column text-center">
                        <i className="comment outline huge icon aboutIcon"></i>
                        <h2 className="ui big header">Live Chat</h2>
                        <p>Chat live about any defect at the Defect Details page. All chat comments are independent
                            to each defect to avoid clutter and confusion.
                        </p>
                    </div>
                </div>
                <div className="three column row">
                    <div className="column text-center">
                        <i className="archive huge icon aboutIcon"></i>
                        <h2 className="ui big header">Performance History</h2>
                        <p>Examine team history by viewing all previously created and closed defects.
                            Also inspect defects individual team members created or worked on.
                        </p>
                    </div>
                    <div className="column text-center">
                        <i className="filter huge icon aboutIcon"></i>
                        <h2 className="ui big header">Filter</h2>
                        <p>Effortlessly sort defects at the Defect Dashboard by filtering through various options.
                            The defects are defaulted to filter by date.
                        </p>
                    </div>
                    <div className="column text-center">
                        <i className="computer huge icon aboutIcon"></i>
                        <h2 className="ui big header">Fully Responsive</h2>
                        <p>Defect Detective is fully responsive which allows you to efficiently update and keep track of defects on the go using any device.</p>
                    </div>
                </div>
            </div>
        </>
    )
})
