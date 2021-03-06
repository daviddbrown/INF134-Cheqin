import {Component, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {FirebaseService} from "../services/firebase.service";


@Component({
    selector: 'app-check-in',
    templateUrl: './check-in.component.html',
    styleUrls: ['./check-in.component.scss']
})
export class CheckInComponent implements OnInit {
    tagEntry = "";
    tags = ["test"];
    entry = "";
    color = "brown";
    colordesc =
        {
            "pink": "You feel happy, excited, overjoyed, or silly.",
            "red": "You feel angry, annoyed, frustrated, or irritated.",
            "orange": "You feel anxious, nervous, or insecure.",
            "yellow": "You feel energetic, hyper, or manic.",
            "green": "You feel calm, refreshed, relaxed, or zen.",
            "blue": "You feel depressed, sad, emotional, gloomy, or weepy.",
            "purple": "You feel active, focused, motivated, or productive",
            "black": "You feel stressed.",
            "grey": "You feel exhausted, fatigued, tired, lethargic, sleepy, or lazy.",
            "white": "You feel normal, neutral, or uneventful."
        };
    myDate: String = new Date().toISOString();
    myTime: String = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().slice(0, -1);


    constructor(public modalController: ModalController, public firebaseService: FirebaseService) {
    }

    ngOnInit() {

    }

    onChange(val) {
        for (var i = 0; i < val.length; i++) {
            val[i] = val[i].toLowerCase();
            val[i] = val[i].replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
        }
        console.log(this.tags);
    }

    setMood(color) {
        this.color = color;
        console.log("Setting mood! your color is " + this.color);
    }

    submitCheckin(myTime, myDate, entry, color, tags) {
        console.log('time: '+ myTime);
        console.log('date: '+ myDate);
        myTime = new Date(myTime);
        myDate = new Date(myDate);
        let time = [myTime.getHours(), myTime.getMinutes()];
        let date = [myDate.getFullYear(), myDate.getMonth(), myDate.getDate()];
        let newDate = new Date(date[0], date[1], date[2], time[0], time[1]);
        console.log(time, date);
        console.log(newDate);
        this.dismiss();
        this.firebaseService.addEntry(newDate.toISOString(), entry, color, tags);
        console.log("Submitting Check-in.");
    }


    dismiss() {
        this.modalController.dismiss()
    }

    removeTag(tag) {
        this.tags.splice(this.tags.indexOf(tag), 1);

    }

    addTags() {
        this.tagEntry = this.tagEntry.toLowerCase();
        if (this.tags.includes(this.tagEntry)) {
        } else {
            this.tags.push(this.tagEntry);
        }
        this.tagEntry = "";
    }


}
