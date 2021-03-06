import React, { Component } from "react";
import { withRouter } from "react-router";
import { Transition, animated } from "react-spring";
import PropTypes from "prop-types";
import InfoBox from "./InfoBox";
import "./AnimatedInfoBox.css";

class AnimatedInfoBox extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.data !== this.props.data ||
      nextProps.id !== this.props.id ||
      nextProps.location !== this.props.location
    )
      return true;
    return false;
  }

  render() {
    const projectDetails = this.props.data.data.reduce(
      (acc, cur) => ({
        ...acc,
        [cur.survey_answers.project_id]: (
          <InfoBox project={cur} location={this.props.location} />
        )
      }),
      {}
    );

    return (
      <Transition
        native
        items={this.props.id}
        from={{ opacity: 0, transform: "translateX(80%)" }}
        enter={{ opacity: 1, transform: "translateX(0)" }}
        leave={{ opacity: 0, transform: "translateX(70%)" }}
      >
        {id =>
          id !== -1 &&
          (props => (
            <animated.div className="info-box-container" style={{ ...props }}>
              {projectDetails[id]}
            </animated.div>
          ))
        }
      </Transition>
    );
  }
}

AnimatedInfoBox.propTypes = {
  data: PropTypes.object,
  id: PropTypes.any
};

export default withRouter(AnimatedInfoBox);
