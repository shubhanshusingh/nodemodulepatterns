'use strict';
var https = require('https');
var util = require('util');

console.log('Loading function');

exports.handler = (event, context, callback) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));
    const message = event.Records[0].Sns.Message;
    console.log('From SNS:', message);
    var postData = {
        "channel": "#lambda-services",
        "username": "AWS SNS via Lambda",
        "text": "*" + event.Records[0].Sns.Subject + "*",
        "icon_emoji": ":bulb:"
    };
    // {
    //     "AlarmName": "MatchPdfDlqAlarm",
    //     "AlarmDescription": "MatchPdfDlqAlarm",
    //     "AWSAccountId": "627476250028",
    //     "NewStateValue": "ALARM",
    //     "NewStateReason": "Threshold Crossed: 1 datapoint [2.0 (04/11/17 13:50:00)] was greater than or equal to the threshold (1.0).",
    //     "StateChangeTime": "2017-11-04T13:51:20.903+0000",
    //     "Region": "Asia Pacific (Singapore)",
    //     "OldStateValue": "OK",
    //     "Trigger": {
    //     "MetricName": "ApproximateNumberOfMessagesVisible",
    //         "Namespace": "AWS/SQS",
    //         "StatisticType": "Statistic",
    //         "Statistic": "SUM",
    //         "Unit": null,
    //         "Dimensions": [
    //         {
    //             "name": "QueueName",
    //             "value": "MatchPdfCreateDeadLetterQueue"
    //         }
    //     ],
    //         "Period": 60,
    //         "EvaluationPeriods": 1,
    //         "ComparisonOperator": "GreaterThanOrEqualToThreshold",
    //         "Threshold": 1,
    //         "TreatMissingData": "",
    //         "EvaluateLowSampleCountPercentile": ""
    // }
    // }
    var severity = "good";

    var dangerMessages = [
        " but with errors",
        " to RED",
        "During an aborted deployment",
        "Failed to deploy application",
        "Failed to deploy configuration",
        "has a dependent object",
        "is not authorized to perform",
        "Pending to Degraded",
        "Stack deletion failed",
        "Unsuccessful command execution",
        "You do not have permission",
        "Your quota allows for 0 more running instance"];

    var warningMessages = [
        " aborted operation.",
        " to YELLOW",
        "Adding instance ",
        "Degraded to Info",
        "Deleting SNS topic",
        "is currently running under desired capacity",
        "Ok to Info",
        "Ok to Warning",
        "Pending Initialization",
        "Removed instance ",
        "Rollback of environment"
    ];

    for(var dangerMessagesItem in dangerMessages) {
        if (message.indexOf(dangerMessages[dangerMessagesItem]) != -1) {
            severity = "danger";
            break;
        }
    }

    // Only check for warning messages if necessary
    if (severity == "good") {
        for(var warningMessagesItem in warningMessages) {
            if (message.indexOf(warningMessages[warningMessagesItem]) != -1) {
                severity = "warning";
                break;
            }
        }
    }

    postData.attachments = [
        {
            "color": severity,
            "text":"ALARM NAME: " +message.AlarmName
            // + " - "+ "ALARM METRIC" + message.Trigger.MetricName
        }
    ];

    var options = {
        method: 'POST',
        hostname: 'hooks.slack.com',
        port: 443,
        path: '/services/T2QM2GXCJ/B7F33HGP9/FUzasG7wwRFFq0TVCa65Ey4u'
    };

    var req = https.request(options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            context.done(null);
        });
    });

    req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });

    req.write(util.format("%j", postData));
    req.end();

    callback(null, message);


};
