/*!

=========================================================
* Now UI Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// react plugin used to create charts
import { Doughnut, Line, Bar } from "react-chartjs-2";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  CardImg,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Table,
  Button,
  Label,
  FormGroup,
  Input,
  UncontrolledTooltip
} from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.jsx";

import {
  dashboardPanelChart,
  dashboardShippedProductsChart,
  dashboardAllProductsChart,
  dashboard24HoursPerformanceChart
} from "variables/charts.jsx";

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
	  pieLabels: ['Normal', 'One-Sided', 'Slouch', 'FHP'],
	  datasets: undefined,
	  normal: 10,
	  fhp: 20,
      one_sided: 10,
	  slouch: 30,
	  level_1: 1,
	  level_2: 1,
	  level_3: 1
    }
	this.url = 'http://52.69.0.213:8000/api/report' 
  }
  componentWillMount(){
	this.state.datasets = canvas => {
      const ctx = canvas.getContext("2d");
	  var chartColor = "#FFFFFF";
      var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
      gradientStroke.addColorStop(0, "#80b6f4");
      gradientStroke.addColorStop(1, chartColor);
      var gradientFill = ctx.createLinearGradient(0, 200, 0, 50);
      gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
      gradientFill.addColorStop(1, "rgba(255, 255, 255, 0.14)");
 	  return {
	    labels: [
		  "Normal Posture",
		  "Forward Head Posture" ,
		  "One-sided Posture",
		  "Slouch Posture",
	    ],
	    datasets: [
		  {
		    label: "Data",
		    borderColor: chartColor,
		    pointBorderColor: chartColor,
		    pointBackgroundColor: "#5360ff",
			pointHoverBackgroundColor: "#5360ff",
			pointHoverBorderColor: chartColor,
			pointBorderWidth: 1,
			pointHoverRadius: 7,
			pointHoverBorderWidth: 2,
			pointRadius: 5,
			fill: true,
			backgroundColor: gradientFill,
			borderWidth: 2,
		    data: [this.state.normal, this.state.fhp, this.state.one_sided, this.state.slouch]
		  }
	    ]
      };
    }
  }
  componentDidMount() {
	console.log(window.location.href.split("/")[5])
	fetch(this.url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
			'Authorization': 'Bearer ' +  window.location.href.split("/")[5]
        },
    })
	.then( res => {
	  if (res.status !== 200) 
        throw new Error("Not 200 response")
	  return res.json()
	})
	.then( data => {
	  console.log(data)  
      this.setState({'normal': data.Normal, 'fhp': data.FHP, 'one_sided': data.Scoliosis, 
					'slouch': data.Slouch, 'level_1': Number(data.FHPLevel), 'level_2': Number(data.ScoliosisLevel),
					'level_3': Number(data.SlouchLevel)})
	})
	.catch( err => console.log(err) )
	
  }
  render() {
    return (
      <>
        <PanelHeader
          size="lg"
          content={
            <Doughnut
              data={this.state.datasets}
              options={dashboardPanelChart.options}
            />
          }
        />
        <div className="content">
          <Row>
            <Col xs={12} md={4}>
              <Card className="card-chart" style={{ width: '28rem', height: '38rem'}}>
                <CardHeader>
                  <h5 className="card-category">Right side</h5>
                  <CardTitle tag="h4">Level {this.state.level_1}</CardTitle>
                </CardHeader>
                <CardImg top min-height='80%' height='auto' width='auto' src={require("../assets/img/1_"+this.state.level_1.toString()+"_"+this.state.level_3.toString()+".png")} />
              </Card>
            </Col>
            <Col xs={12} md={4}>
              <Card className="card-chart" style={{ width: '28rem', height: '38rem'}}>
                <CardHeader>
                  <h5 className="card-category">Front side</h5>
                  <CardTitle tag="h4">Level {this.state.level_2}</CardTitle>
                </CardHeader>
                <CardImg top max-height='80%' width='auto' src={require("../assets/img/2_"+this.state.level_2.toString()+".png")} />
              </Card>
            </Col>
            <Col xs={12} md={4}>
              <Card className="card-chart" style={{ width: '28rem', height: '38rem'}}>
                <CardHeader>
                  <h5 className="card-category">Left side</h5>
                  <CardTitle tag="h4">Level {this.state.level_3}</CardTitle>
                </CardHeader>
                <CardImg top max-height='80%' width='auto' src={require("../assets/img/3_"+this.state.level_1.toString()+"_"+this.state.level_3.toString()+".png")} />
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6}>
              <Card className="card-tasks">
                <CardHeader>
                  <h5 className="card-category">Posture Checkup</h5>
                  <CardTitle tag="h4">Examine table</CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="table-full-width table-responsive">
                    <Table>
                      <tbody>
                        <tr>
                          <td>
                            <FormGroup check>
                              <Label check>
                                <Input defaultChecked type="checkbox" />
                                <span className="form-check-sign" />
                              </Label>
                            </FormGroup>
                          </td>
                          <td className="text-left">
							I use the computer more than 8 hours a day.
                          </td>
                          <td className="td-actions text-right">
                            <Button
                              className="btn-round btn-icon btn-icon-mini btn-neutral"
                              color="info"
                              id="tooltip731609871"
                              type="button"
                            >
                              <i className="now-ui-icons ui-2_settings-90" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip731609871"
                            >
                              Edit Task
                            </UncontrolledTooltip>
                            <Button
                              className="btn-round btn-icon btn-icon-mini btn-neutral"
                              color="danger"
                              id="tooltip923217206"
                              type="button"
                            >
                              <i className="now-ui-icons ui-1_simple-remove" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip923217206"
                            >
                              Remove
                            </UncontrolledTooltip>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <FormGroup check>
                              <Label check>
                                <Input type="checkbox" />
                                <span className="form-check-sign" />
                              </Label>
                            </FormGroup>
                          </td>
						  <td className="text-left">
							My hands and feet are cold and I'm often told that I slouched.
                          </td>
                          <td className="td-actions text-right">
                            <Button
                              className="btn-round btn-icon btn-icon-mini btn-neutral"
                              color="info"
                              id="tooltip731609871"
                              type="button"
                            >
                              <i className="now-ui-icons ui-2_settings-90" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip731609871"
                            >
                              Edit Task
                            </UncontrolledTooltip>
                            <Button
                              className="btn-round btn-icon btn-icon-mini btn-neutral"
                              color="danger"
                              id="tooltip923217206"
                              type="button"
                            >
                              <i className="now-ui-icons ui-1_simple-remove" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip923217206"
                            >
                              Remove
                            </UncontrolledTooltip>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <FormGroup check>
                              <Label check>
                                <Input type="checkbox" />
                                <span className="form-check-sign" />
                              </Label>
                            </FormGroup>
                          </td>
						  <td className="text-left">
                            My neck and shoulders often get stiff.
                          </td>
                          <td className="td-actions text-right">
                            <Button
                              className="btn-round btn-icon btn-icon-mini btn-neutral"
                              color="info"
                              id="tooltip731609871"
                              type="button"
                            >
                              <i className="now-ui-icons ui-2_settings-90" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip731609871"
                            >
                              Edit Task
                            </UncontrolledTooltip>
                            <Button
                              className="btn-round btn-icon btn-icon-mini btn-neutral"
                              color="danger"
                              id="tooltip923217206"
                              type="button"
                            >
                              <i className="now-ui-icons ui-1_simple-remove" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip923217206"
                            >
                              Remove
                            </UncontrolledTooltip>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <FormGroup check>
                              <Label check>
                                <Input type="checkbox" />
                                <span className="form-check-sign" />
                              </Label>
                            </FormGroup>
                          </td>
                          <td className="text-left">
							I don't feel refreshed even after sleeping.
                          </td>
                          <td className="td-actions text-right">
                            <Button
                              className="btn-round btn-icon btn-icon-mini btn-neutral"
                              color="info"
                              id="tooltip907509347"
                              type="button"
                            >
                              <i className="now-ui-icons ui-2_settings-90" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip907509347"
                            >
                              Edit Task
                            </UncontrolledTooltip>
                            <Button
                              className="btn-round btn-icon btn-icon-mini btn-neutral"
                              color="danger"
                              id="tooltip496353037"
                              type="button"
                            >
                              <i className="now-ui-icons ui-1_simple-remove" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip496353037"
                            >
                              Remove
                            </UncontrolledTooltip>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <FormGroup check>
                              <Label check>
                                <Input defaultChecked type="checkbox" />
                                <span className="form-check-sign" />
                              </Label>
                            </FormGroup>
                          </td>
                          <td className="text-left">
							My eyes are stiff and I suffer from chronic headaches.
                          </td>
                          <td className="td-actions text-right">
                            <Button
                              className="btn-round btn-icon btn-icon-mini btn-neutral"
                              color="info"
                              id="tooltip326247652"
                              type="button"
                            >
                              <i className="now-ui-icons ui-2_settings-90" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip326247652"
                            >
                              Edit Task
                            </UncontrolledTooltip>
                            <Button
                              className="btn-round btn-icon btn-icon-mini btn-neutral"
                              color="danger"
                              id="tooltip389516969"
                              type="button"
                            >
                              <i className="now-ui-icons ui-1_simple-remove" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip389516969"
                            >
                              Remove
                            </UncontrolledTooltip>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="now-ui-icons loader_refresh spin" /> Updated 3
                    minutes ago
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col xs={12} md={6}>
              <Card>
                <CardHeader>
                  <h5 className="card-category">Today Exercise List</h5>
                  <CardTitle tag="h4">Start Now!</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Exercise Name</th>
                        <th>How to do</th>
                        <th className="text-right">Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Sky Reach</td>
                        <td>Reach hands as high as possible</td>
                        <td className="text-right">30 Min</td>
                      </tr>
                      <tr>
                        <td>Toe Touch</td>
                        <td>First to relax the back, then to touch the floor</td>
                        <td className="text-right">10 Min</td>
                      </tr>
                      <tr>
                        <td>Neck Roll</td>
                        <td>Roll to the sides and forward. Don't roll back</td>
                        <td className="text-right">20 Min</td>
                      </tr>
                      <tr>
                        <td>Shoulder Stretch</td>
                        <td>Pull the elbows</td>
                        <td className="text-right">15 Min</td>
                      </tr>
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Dashboard;
