import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../action/index';
import LeftBar from '../../components/LeftBar';
import { Link } from 'react-router-dom';
import styles from './styles/dashboard.scss';
import {
	Image,
	Loader,
	Button,
	List,
	Icon,
	Label,
	Divider
} from 'semantic-ui-react';

class Profile extends Component {
	componentDidMount() {
		this.props.fetchProfile();
	}

	renderProfileSkills() {
		const { profile } = this.props;
		return profile.skills.map((skill, i) => {
			return (
				<List.Item className={styles.ListSkills} key={i}>
					<h4 key={i}>{skill.toString().toUpperCase()}</h4>
				</List.Item>
			);
		});
	}

	renderContent() {
		const { profile } = this.props;
		console.log(profile);
		switch (profile) {
			case null:
				return <Loader active>Waiting</Loader>
			default:
				return (
					<div>
						<div className={styles.profile}>
							<div>
								<Image size='medium' src={profile.user.avatar} />
							</div>
							<div className={styles.description}>
								<div className={styles.header}>
									<Label color='purple' pointing='below'>Hello there</Label>
									<h1>
										<span className={styles.name}>Hello, i'm {profile.username}</span>
										<span className={styles.bio}>{profile.bio}</span>
									</h1>
									<Divider />
								</div>
								<div className={styles.biodata}>
									<h1>
										<div className={styles.wrapper}>
											<span className={styles.label}>Company</span>
											<span className={styles.value}>{profile.company}</span>
										</div>
										<div className={styles.wrapper}>
											<span className={styles.label}>Status</span>
											<span className={styles.value}>{profile.status}</span>
										</div>
										<div className={styles.wrapper}>
											<span className={styles.label}>Skills</span>
											<span className={styles.value}>
												<List horizontal>
													{this.renderProfileSkills()}
												</List>
											</span>
										</div>
									</h1>
								</div>
							</div>
							<div>
								<Button 
									as={Link} 
									icon 
									floated='right' 
									primary 
									circular
									to={{ pathname: '/user/edit_profile', state: { skills: profile.skills }}}
								>
									<Icon name='edit' />
								</Button>
							</div>
						</div>
							<Button.Group primary inverted className={styles.btngroup} fluid>
								<Button icon>
									<Icon name='instagram' />
								</Button>
								<Button icon>
									<Icon name='youtube' />
								</Button>
								<Button icon>
									<Icon name='facebook' />
								</Button>
								<Button icon>
									<Icon name='linkedin' />
								</Button>
								<Button icon>
									<Icon name='github' />
								</Button>
							</Button.Group>
					</div>
				)
		}
	}

	render() {
		return (
			<div className={styles.container}>
				<LeftBar currentPage='Profile' />
				<div className={styles.profileContainer}>
					{this.renderContent()}
				</div>
			</div>
		);
	};
}

const mapStateToProps = state => {
	return {
		profile: state.profile
	}
}

export default connect(mapStateToProps, actions)(Profile);