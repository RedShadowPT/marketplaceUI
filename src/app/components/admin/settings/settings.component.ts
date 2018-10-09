import { Component, OnInit } from '@angular/core';
import { templateJitUrl } from '@angular/compiler';
import { SettingsService } from './settings.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  private _backendSettings: Object;
  get backendSettings() {
    return this._backendSettings;
  }
  set backendSettings(value) {
    this._backendSettings = value;
  }

  saveMessage = '';

  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.settingsService.getSettings()
      .subscribe(response => {
        this.backendSettings = response;
      });
  }

  onSave(settingsForm: NgForm) {
    console.log(settingsForm.value);
    this.settingsService.setSettings(settingsForm.value)
      .subscribe(respose => {
        if (respose) {
          this.saveMessage = respose.message;
        } else {
          this.saveMessage = 'Error saving settings!';
        }
      });
  }
}
