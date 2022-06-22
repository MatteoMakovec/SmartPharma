# SmartPharma - Service description

SmartPharma service allows to automate and simplify the process of providing medicine. The service is provided from a pharmacy to a common customer. It simplifies the process of ordering any medicine from the pharmacy.

When a customer wants to order a certain medicine, she/he will connect through a Web
Application to submit a new order request. Once the request was submitted, the information provided by the customer are automatically checked. The information should include personal data (name, surname, residence, tax code), the delivery address, the name of the medicine and, optionally, the prescription. The personal data is checked automatically through api. The delivery address is checked automatically before submitting the request by google api. The prescription is also checked automatically by requesting a confirmation from the ministry of health. 


The provided information will be approved or denied. 
In case of approval the information of stock availability is requested from the pharmacy. 
In case of denial or stock unavailability a message is sent to the customer with the denial reason.

In case the pharmacy confirms the availability of stock, SmarthPharma delegates a third-party payment system to ultimate the purchase with the customer. 
After the payment is confirmed, SmartPharma computes the delivery time by considering the customers’ address and availability of delivery men.
Finally, SmartPharma contacts the selected delivery man sending her/him the order details, and provides a confirmation notification though the Web Application to the user.