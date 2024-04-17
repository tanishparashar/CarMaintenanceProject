from rest_framework import generics
from rest_framework.views import APIView
from django.http import FileResponse
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from ..models import PredictiveMaintenance, Car
from ..serializers import PredictiveMaintenanceSerializer
from rest_framework.response import Response
from rest_framework import status
from ..ML.predictorv2 import make_predictions
from datetime import datetime, timedelta
from reportlab.platypus import SimpleDocTemplate, Paragraph
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_CENTER
from reportlab.platypus import Spacer
import os



# Get the current date
current_date = datetime.now()

def generate_pdf(predictive_maintenance):
    os.makedirs('Reports', exist_ok=True)
    filename = f"Reports/PredictiveMaintenanceReport_{predictive_maintenance.car.id}.pdf"
    doc = SimpleDocTemplate(filename)
    styles = getSampleStyleSheet()

    # Create a new style for the title
    title_style = ParagraphStyle(
        'Title',
        parent=styles['Title'],
        fontSize=24,
        textColor='navy',
        alignment=TA_CENTER
    )

    # Create a new style for the predefined content
    content_style = ParagraphStyle(
        'Content',
        parent=styles['BodyText'],
        fontSize=12,
        textColor='black'
    )

    elements = []
    elements.append(Paragraph("Predictive Maintenance Report", title_style))
    elements.append(Spacer(1, 12))
    elements.append(Paragraph("This is some predefined content.", content_style))
    elements.append(Paragraph(f"Car: {predictive_maintenance.car}", styles['Normal']))
    elements.append(Paragraph(f"Car Make: {predictive_maintenance.car.make}", styles['Normal']))
    elements.append(Paragraph(f"Car Model: {predictive_maintenance.car.model}", styles['Normal']))
    elements.append(Paragraph(f"Car Year: {predictive_maintenance.car.year}", styles['Normal']))
    elements.append(Paragraph(f"Engine Type: {predictive_maintenance.car.engine_type}", styles['Normal']))
    elements.append(Paragraph(f"Fuel Type: {predictive_maintenance.car.fuel_type}", styles['Normal']))
    elements.append(Paragraph(f"Mileage: {predictive_maintenance.car.mileage}", styles['Normal']))
    elements.append(Paragraph(f"Next Maintenance Date: {predictive_maintenance.next_maintenance_date}", styles['Normal']))
    elements.append(Paragraph(f"Remaining Engine Life: {predictive_maintenance.remaining_engine_life}", styles['Normal']))
    elements.append(Paragraph(f"Fuel Efficiency: {predictive_maintenance.fuel_efficiency}", styles['Normal']))
    elements.append(Paragraph(f"Component Wear and Tear: {predictive_maintenance.component_wear_and_tear}", styles['Normal']))
    elements.append(Paragraph(f"Maintenance Cost: {predictive_maintenance.maintenance_cost}", styles['Normal']))
    doc.build(elements)
    return filename


class PredictiveMaintenanceListCreateAPIView(generics.ListCreateAPIView):
    queryset = PredictiveMaintenance.objects.all()
    serializer_class = PredictiveMaintenanceSerializer

    def create(self, request, *args, **kwargs):
        car_id = kwargs.get('pk')
        car = Car.objects.get(id=car_id)
        
        car_data = {
            'Car Make': [car.make],
            'Car Model': [car.model],
            'Car Year': [car.year],
            'Engine Type': [car.engine_type],
            'Fuel Type': [car.fuel_type],
            'Mileage': [car.mileage]
        }

        model_dir = './app/ML/models'

        prediction = make_predictions(car_data, model_dir)
        print(prediction)
        # Calculate the next maintenance date
        next_maintenance_date = current_date + timedelta(days=prediction['Days Until Next Maintenance'].item())

        predictive_maintenance = PredictiveMaintenance.objects.create(
            car=car,
            next_maintenance_date=next_maintenance_date.date(),
            remaining_engine_life=prediction['Remaining Engine Life'].item(),
            fuel_efficiency=prediction['Fuel Efficiency'].item(),
            component_wear_and_tear=prediction['Component Wear and Tear'].item(),
            maintenance_cost=prediction['Maintenance Costs'].item()
        )
        serializer = self.get_serializer(predictive_maintenance)
        filename = generate_pdf(predictive_maintenance)
        # response_data = serializer.data
        # response_data['report_link'] = request.build_absolute_uri(filename)
        # return Response(response_data, status=status.HTTP_201_CREATED)
        file_path = f"Reports/PredictiveMaintenanceReport_{car_id}.pdf"
        if os.path.exists(file_path):
            return FileResponse(open(file_path, 'rb'), content_type='application/pdf')
        else:
            return Response({"error": "Report not found."}, status=status.HTTP_404_NOT_FOUND)

class PredictiveMaintenanceRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = PredictiveMaintenance.objects.all()
    serializer_class = PredictiveMaintenanceSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]



class CarPredictiveMaintenanceListAPIView(generics.ListAPIView):
    serializer_class = PredictiveMaintenanceSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self, pk):
        return PredictiveMaintenance.objects.filter(car=pk)


# class PredictiveMaintenanceReportAPIView(APIView):
#     def get(self, request, *args, **kwargs):
#         car_id = kwargs.get('pk')
#         file_path = f"Reports/PredictiveMaintenanceReport_{car_id}.pdf"
#         if os.path.exists(file_path):
#             return FileResponse(open(file_path, 'rb'), content_type='application/pdf')
#         else:
#             return Response({"error": "Report not found."}, status=status.HTTP_404_NOT_FOUND)