import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {DayPilot, DayPilotSchedulerComponent} from 'daypilot-pro-angular';
import {DataService} from './data.service';

@Component({
  selector: 'scheduler-component',
  template: `<daypilot-scheduler [config]="config" [events]="events" #scheduler></daypilot-scheduler>`,
  styles: [``]
})
export class SchedulerComponent implements AfterViewInit {

  @ViewChild('scheduler', {static: false})
  scheduler: DayPilotSchedulerComponent;

  events: any[] = [];

  config: DayPilot.SchedulerConfig = {
    timeHeaders: [{"groupBy":"Month"},{"groupBy":"Day","format":"d"}],
    scale: "Day",
    days: DayPilot.Date.today().daysInMonth(),
    startDate: DayPilot.Date.today().firstDayOfMonth(),
    timeRangeSelectedHandling: "Enabled",
    onTimeRangeSelected: function (args) {
      var dp = this;
      DayPilot.Modal.prompt("Create a new event:", "Event 1").then(function(modal) {
        dp.clearSelection();
        if (!modal.result) { return; }
        dp.events.add(new DayPilot.Event({
          start: args.start,
          end: args.end,
          id: DayPilot.guid(),
          resource: args.resource,
          text: modal.result
        }));
      });
    },
    eventMoveHandling: "Update",
    onEventMoved: function (args) {
      this.message("Event moved: " + args.e.text());
    },
    eventResizeHandling: "Update",
    onEventResized: function (args) {
      this.message("Event resized: " + args.e.text());
    },
    eventDeleteHandling: "Update",
    onEventDeleted: function (args) {
      this.message("Event deleted: " + args.e.text());
    },
    eventClickHandling: "Disabled",
    eventHoverHandling: "Bubble",
    bubble: new DayPilot.Bubble({
      onLoad: function(args) {
        // if event object doesn't specify "bubbleHtml" property 
        // this onLoad handler will be called to provide the bubble HTML
        args.html = "Event details";
      }
    }),
    treeEnabled: true,
  };

  constructor(private ds: DataService) {
  }

  ngAfterViewInit(): void {
    this.ds.getResources().subscribe(result => this.config.resources = result);

    const from = this.scheduler.control.visibleStart();
    const to = this.scheduler.control.visibleEnd();
    this.ds.getEvents(from, to).subscribe(result => {
      this.events = result;
    });
  }

}

