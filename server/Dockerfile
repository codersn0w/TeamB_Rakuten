FROM python:3.7

ARG project_dir=/project/

ADD requirements.txt $project_dir

WORKDIR $project_dir

RUN pip install --upgrade pip
RUN pip install -r requirements.txt --ignore-installed