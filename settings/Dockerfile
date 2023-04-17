FROM python:3.10
ENV PYTHONDONTWRITEBYTECODE 1
# WORKDIR /settings
# COPY Pipfile Pipfile.lock /settings/
# RUN pip install pipenv && pipenv install --system
# RUN pip install -r req.txt
# COPY . /settings/
# CMD ["python3 manage.py runserver"]

ENV PYTHONUNBUFFERED=1
WORKDIR /settings
COPY req.txt /settings/

RUN pip3 install -r req.txt
# RUN python3 manage.py migrate
COPY . /settings/