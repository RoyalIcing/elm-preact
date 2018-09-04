import { h, Component } from 'preact';
import style from './style';
import { Elm } from '../../Main.elm';

export default class Profile extends Component {
	state = {
		currentTimePosix: Date.now(),
		count: 0
	};

	increment = () => {
		this.elmWorker.ports.changeCountBy.send(3)
	};

	// gets called when this route is navigated to
	componentDidMount() {
		this.elmWorker = Elm.Main.init({
			flags: this.state,
		});

		const modelChanged = (model) => {
			this.setState(model)
		};
		this.elmWorker.ports.modelChanged.subscribe(modelChanged);

		this.unsubscribe = () => {
			this.elmWorker.ports.modelChanged.unsubscribe(modelChanged);
		};
	}

	componentWillUnmount() {
		this.unsubscribe();
		delete this.unsubscribe;
		delete this.elmWorker;
	}

	// Note: `user` comes from the URL, courtesy of our router
	render({ user }, { currentTimePosix, count }) {
		return (
			<div class={style.profile}>
				<h1>Profile: {user}</h1>
				<p>This is the user profile for a user named { user }.</p>

				<div>Current time: {new Date(currentTimePosix).toLocaleString()}</div>

				<p>
					<button onClick={this.increment}>Click Me</button>
					{' '}
					Clicked {count} times.
				</p>
			</div>
		);
	}
}
