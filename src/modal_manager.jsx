import React from 'react';
import ReactDOM from 'react-dom';
import RulesModal from './rules_modal';

class ModalManager extends React.Component {
    constructor(props) {
        super(props);
        this.mainDiv = null;
    }

    componentDidMount() {
        this.mainDiv = document.querySelector("#dndb-main");
    }

    render() {
        if (!this.props.modalOut) {
            return null;
        }
        const modal = <RulesModal setModalOut={this.props.setModalOut} />
        return ReactDOM.createPortal(modal, this.mainDiv)
    }
}

export default ModalManager;