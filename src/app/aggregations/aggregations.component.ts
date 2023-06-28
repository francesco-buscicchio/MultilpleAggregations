import { Component } from '@angular/core';
import { NodeService } from '../service/node-service.service';

@Component({
  selector: 'app-aggregations',
  templateUrl: './aggregations.component.html',
  styleUrls: ['./aggregations.component.scss'],
})
export class AggregationsComponent {
  mainData: any = [];
  viewData: any = [];

  noAggregationData: any = [];
  groupingProjectData: any = [];
  groupingEmployerData: any = [];

  viewPicked: String = 'Ungrouped';
  viewList: String[] = [
    'Ungrouped',
    'Project Group',
    'Employer-Project Group',
    'Project-Employer Group',
  ];
  columns: Column[] = [];

  constructor(public node: NodeService) {}

  ngOnInit(): void {
    this.node.httpGet('/aggregation/mainData').subscribe((val: any) => {
      this.mainData = val.results;
      this.refresh();
    });
  }

  refresh() {
    this.viewData = [];
    this.genColumns();
    switch (this.viewPicked) {
      case 'Ungrouped': {
        this.genWithoutAggregations();
        break;
      }
      case 'Project Group': {
        this.genGroupingProject();
        break;
      }
      default: {
        this.genGroupingEmployerProject();
        break;
      }
    }
  }

  genColumns() {
    if (this.viewPicked == 'Ungrouped') {
      this.columns = [
        {
          property: 'employee',
          description: 'Employee',
          type: 'text',
          width: '15%',
        },
        {
          property: 'project',
          description: 'Project',
          type: 'text',
          width: '25%',
        },
        { property: 'date', description: 'Date', type: 'date', width: '25%' },
        {
          property: 'hours',
          description: 'Hours',
          type: 'numeric',
          width: '10%',
        },
      ];
    }
    if (this.viewPicked == 'Project Group') {
      this.columns = [
        {
          property: 'project',
          description: 'Project',
          type: 'text',
          width: '25%',
        },
        {
          property: 'hours',
          description: 'Hours',
          type: 'numeric',
          width: '10%',
        },
      ];
    }
    if (this.viewPicked == 'Employer-Project Group') {
      this.columns = [
        {
          property: 'employee',
          description: 'Employee',
          type: 'text',
          width: '15%',
        },
        {
          property: 'project',
          description: 'Project',
          type: 'text',
          width: '25%',
        },
        {
          property: 'hours',
          description: 'Hours',
          type: 'numeric',
          width: '10%',
        },
      ];
    }
    if (this.viewPicked == 'Project-Employer Group') {
      this.columns = [
        {
          property: 'project',
          description: 'Project',
          type: 'text',
          width: '25%',
        },
        {
          property: 'employee',
          description: 'Employee',
          type: 'text',
          width: '15%',
        },
        {
          property: 'hours',
          description: 'Hours',
          type: 'numeric',
          width: '10%',
        },
      ];
    }
  }

  genWithoutAggregations() {
    for (let item of this.mainData)
      this.viewData.push({
        project: item.project.name,
        employee: item.employee.name,
        date: item.date,
        hours: item.hours,
      });
  }

  genGroupingProject() {
    for (let item of this.mainData) {
      let index = this.viewData.findIndex((val: any) => {
        return val.project == item.project.name;
      });
      if (index != -1) this.viewData[index].hours += item.hours;
      else
        this.viewData.push({ project: item.project.name, hours: item.hours });
    }
  }

  genGroupingEmployerProject() {
    for (let item of this.mainData) {
      let index = this.viewData.findIndex((val: any) => {
        return (
          val.project == item.project.name && val.employee == item.employee.name
        );
      });
      if (index != -1) this.viewData[index].hours += item.hours;
      else
        this.viewData.push({
          project: item.project.name,
          employee: item.employee.name,
          hours: item.hours,
        });
    }

    if (this.viewPicked == 'Employer-Project Group')
      this.viewData.sort((a: any, b: any) =>
        a.employee > b.employee ? 1 : b.employee > a.employee ? -1 : 0
      );
    else if (this.viewPicked == 'Project-Employer Group')
      this.viewData.sort((a: any, b: any) =>
        a.project > b.project ? 1 : b.project > a.project ? -1 : 0
      );
  }
}

export interface Column {
  property: string;
  description: string;
  type: string;
  width: string;
}
