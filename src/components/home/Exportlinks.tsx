import * as React from "react";
import "./HomeStyles.css";
import { ExportAction } from "../../actions/ExportAction";
import { ExportTypeEnum } from "../../common/constants/exportType";

interface Props {
  onLoading: Function;
}
class State {
  csvExporting: boolean = false;
  pdfExporting: boolean = false;
  xmlExporting: boolean = false;
  jsonExporting: boolean = false;
}
export class Exportlinks extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = new State();
  }

  render() {
    return (
      <div className="header">
        <div className="headerRight">
          <p className="text-left">
            Download hele rapporten her:{" "}
            <a href="#" onClick={() => this.handleExportCSV()}>CSV</a>
            &nbsp;{" "}
            <a href="#" onClick={() => this.handleExportPDF()}>
              PDF
            </a>
            &nbsp;{" "}
            <a href="#" onClick={() => this.handleExportXML()}>
              XML
            </a>
            &nbsp;{" "}
            <a href="#" onClick={() => this.handleExportJSON()}>
              JSON
            </a>
            &nbsp;
          </p>
        </div>
      </div>
    );
  }

  handleExportCSV = () => {
    if (this.state.csvExporting) {
      return;
    }
    this.setState(prev => {
      return { ...prev, csvExporting: true };
    });
    this.props.onLoading(true);
    new ExportAction(ExportTypeEnum.csv)
      .start()
      .then(res => {
        this.setState(prev => {
          return { ...prev, csvExporting: !prev.csvExporting };
        });
        this.props.onLoading(false);
      })
      .catch(ex => {
        this.setState(prev => {
          return { ...prev, csvExporting: !prev.csvExporting };
        });
        this.props.onLoading(false);
      });
  };

  handleExportPDF = () => {
    if (this.state.pdfExporting) {
      return;
    }
    this.setState(prev => {
      return { ...prev, pdfExporting: true };
    });
    this.props.onLoading(true);
    new ExportAction(ExportTypeEnum.pdf)
      .start()
      .then(res => {
        this.setState(prev => {
          return { ...prev, pdfExporting: false };
        });
        this.props.onLoading(false);
      })
      .catch(ex => {
        this.setState(prev => {
          return { ...prev, pdfExporting: false };
        });
        this.props.onLoading(false);
      });
  };

  handleExportXML = () => {
    if (this.state.xmlExporting) {
      return;
    }

    this.setState(prev => {
      return { ...prev, xmlExporting: true };
    });
    this.props.onLoading(true);
    new ExportAction(ExportTypeEnum.xml)
      .start()
      .then(res => {
        this.setState(prev => {
          return { ...prev, xmlExporting: false };
        });
        this.props.onLoading(false);
      })
      .catch(ex => {
        this.setState(prev => {
          return { ...prev, xmlExporting: false };
        });
        this.props.onLoading(false);
      });
  };

  handleExportJSON = () => {
    if (this.state.jsonExporting) {
      return;
    }
    this.setState(prev => {
      return { ...prev, jsonExporting: true };
    });
    this.props.onLoading(true);
    new ExportAction(ExportTypeEnum.json)
      .start()
      .then(res => {
        this.setState(prev => {
          return { ...prev, jsonExporting: false };
        });
        this.props.onLoading(false);
      })
      .catch(ex => {
        this.setState(prev => {
          return { ...prev, jsonExporting: false };
        });
        this.props.onLoading(false);
      });
  };
}
