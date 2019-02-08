import React, { Component } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import ContentHeader from '../common/template/contentHeader'
import Content from '../common/template/content'
import ValueBox from '../common/widget/valueBox'
import { getSummary } from './dashboardActions'

class Dashboard extends Component {

    componentWillMount() {
        this.props.getSummary()
    }

    render() {
        const { credit, debit } = this.props.summary

        return (
            <div>
                <ContentHeader title='Dashboard' small='Versão 1.0' />
                <Content>
                    <div className='row'>
                        <ValueBox cols='12 6 4' color='green' icon='bank' 
                            value={`R$ ${credit}`} text='Total de Créditos' />
                        <ValueBox cols='12 6 4' color='red' icon='credit-card'
                            value={`R$ ${debit}`} text='Total de Débitos' />
                        <ValueBox cols='12 6 4' color='blue' icon='money'
                            value={`R$ ${credit - debit}`} text='Valor Consolidado' />
                    </div>
                </Content>
            </div>
        )
    }
}

const mapStateToProps = state => ({summary: state.dashboard.summary})
const mapDispatchToProps = dispatch => bindActionCreators({getSummary}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)