# SmartPharma - Service description

SmartPharma service allows to automate and simplify the process of providing medicine. The service is provided from a pharmacy to a common customer. It simplifies the process of ordering any medicine from the pharmacy.

When a customer wants to order a certain medicine, she/he will connect through a Web
Application to submit a new order request. Once the request was submitted, the information provided by the customer is automatically checked. The information should include personal data (name, tax code), the delivery address, the name of the medicine and, optionally, the prescription. The personal data is checked automatically through api. The delivery address is checked by contacting google api and receiving back the map’s information. The prescription is also checked automatically by requesting a confirmation from the ministry of health.

The provided information will be either approved or denied. 
In case of approval the requested medicine is automatically checked for availability in stock by SmartPharma. 
In case of denial or stock unavailability a notification is sent to the customer with the denial reason.

In case of stock availability, SmarthPharma delegates a third-party payment system to finalize the purchase with the customer. 
After the payment is confirmed, SmartPharma computes the delivery time by taking into consideration the maps’ information and availability of delivery men.
Finally, SmartPharma contacts the selected delivery man sending her/him the order details, and provides a confirmation notification through the Web Application to the customer.
