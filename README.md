# jQuery WeekLine plugin

WeekLine is a light jQuery plugin for selecting days of a week. It can be particularly helpful for entering weekly schedules, such as cinema movie and theatrical play times, as well as for scheduling weekly league games and actually anything that is weekly based. The usual date pickers are monthly oriented, but there times where picking dates from the coming week only (or 2) is a more natural and convenient way to schedule. Weekline was initially written for such an occasion and more specifically for cinema and theatre date-time data entry, focusing on increasing data entry’s speed while limiting errors.

# Installation

Download plugin's files and include them to your pages, along with the jQuery lib.

    <link rel="Stylesheet" href="styles/cleanslate.css" />
    <link rel="Stylesheet" href="styles/jquery.weekLine.css" />
    <script src="http://code.jquery.com/jquery-latest.min.js"></script>
    <script src="scripts/jquery.weekLine.min.js"></script>

# Example use

You can add a weekLine date picker to a span with id "weekCal" with the above line:

    $("#weekCal").weekLine();

You can get the selected days, using the getSelected method in 4 different formats: as indexes, labels, descriptive text or dates. You can set the selected days, using the setSelected method. You can turn the mouse-down-holding selection off and you can assign a set of instructions to the change event, using the onChange callback function.

The code below creates 4 weekLine day pickers and assigns their values to a span with the id “selectedDays”, using the getSelected method and the onChange callback. Additionally, it sets the mousedownSel to false for the 2nd picker, selects the weekend days for the 3rd and starts the week from Monday using one letter labels, while selecting Monday to Friday for the 4th.

     // Return selected days as indexes
     $("#weekCal1").weekLine({
            onChange: function () {
                    $("#selectedDays").html(
                            $(this).weekLine('getSelected', 'indexes')
                    );
            }
     });
    
     // Return selected days as labels
     $("#weekCal2").weekLine({
            mousedownSel: false,
            onChange: function () {
                    $("#selectedDays").html(
                            $(this).weekLine('getSelected')
                    );
            }
     });
    
     // Return selected days with descriptive text
     var weekCal3 = $("#weekCal3").weekLine({
            onChange: function () {
                    $("#selectedDays").html(
                            $(this).weekLine('getSelected', 'descriptive')
                    );
            }
     });
    
     var nextMonday = nextDay(0);
    
     // Return selected days as dates,
     // starting from coming Monday
     var weekCal4 = $("#weekCal4").weekLine({
            startDate: nextMonday(),
            dayLabels: ["M", "T", "W", "T", "F", "S", "S"],
            onChange: function () {
                    $("#selectedDays").html(
                            $(this).weekLine('getSelected', 'dates')
                    );
            }
     });
    
     // Select some days
     weekCal3.weekLine("setSelected", "Sat,Sun");
     weekCal4.weekLine("setSelected", "0,1,2,3,4"); 

You can find working examples of the above in its site: http://codebits.weebly.com/plugins/category/weekline-day-picker

# MIT Licence

Copyright (c) 2014 Dimitris Kotsakis

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. 