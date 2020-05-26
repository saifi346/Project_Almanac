import { HttpHeaders, HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Component, OnInit ,AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  showSucessMessage: boolean;
  serverErrorMessages: string;

  title = 'angular-gmap';
    @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
    map: google.maps.Map;
    lat = 12.969682;
    lng = 77.724663;

    coordinates = new google.maps.LatLng(this.lat, this.lng);

    mapOptions: google.maps.MapOptions = {
     center: this.coordinates,
     zoom: 16
    };

    marker = new google.maps.Marker({
      position: this.coordinates,
      map: this.map,
    });

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
      
    }

    ngAfterViewInit() {
      this.mapInitializer();
    }

    mapInitializer() {
      this.map = new google.maps.Map(this.gmap.nativeElement, 
      this.mapOptions);
      this.marker.setMap(this.map);
    }

    onSubmit(contactForm: NgForm) {
      if (contactForm.valid) {
        const email = contactForm.value;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        this.http.post('https://formspree.io/mbjzdedy',
          { name: email.name, replyto: email.email, message: email.messages },
          { 'headers': headers }).subscribe(
            response => {
              console.log(response);
              this.showSucessMessage = true;
              setTimeout(() => this.showSucessMessage = false, 4000);
              contactForm.reset();
            },
            err=>{
              this.serverErrorMessages = 'Something Went Wrong'
              setTimeout(() => this.serverErrorMessages = '', 4000);
            }
            
          );
      }
    }

    

}
