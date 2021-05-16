/* global jQuery3, view, echartsJenkinsApi, bootstrap5 */
EChartsJenkinsApi.prototype.configureTrend = function (suffix, fillDialog, saveDialog) {
    const trendConfiguration = jQuery3('#trend-configuration-' + suffix);
    const numberOfBuildsInput = trendConfiguration.find('#builds-' + suffix);
    const numberOfDaysInput = trendConfiguration.find('#days-' + suffix);
    const useBuildAsDomainCheckBox = trendConfiguration.find('#build-domain-' + suffix);
    const trendLocalStorageId = 'jenkins-echarts-trend-configuration-' + suffix;
    const saveButton = '#save-trend-configuration-' + suffix;

    trendConfiguration.on('show.bs.modal', function (e) {
        const trendJsonConfiguration = localStorage.getItem(trendLocalStorageId);
        if (trendJsonConfiguration == null) {
            numberOfBuildsInput.val(50);
            numberOfDaysInput.val(0);
            useBuildAsDomainCheckBox.prop('checked', true);
            if (fillDialog) {
                fillDialog(trendConfiguration, {});
            }
        }
        else {
            const jsonNode = JSON.parse(trendJsonConfiguration);
            numberOfBuildsInput.val(jsonNode.numberOfBuilds);
            numberOfDaysInput.val(jsonNode.numberOfDays);
            useBuildAsDomainCheckBox.prop('checked', jsonNode.buildAsDomain === 'true');
            if (fillDialog) {
                fillDialog(trendConfiguration, jsonNode);
            }
        }
    });

    jQuery3(saveButton).on('click', function (e) {
        const configurationJson = {
            numberOfBuilds: numberOfBuildsInput.val(),
            numberOfDays: numberOfDaysInput.val(),
            buildAsDomain: useBuildAsDomainCheckBox.prop('checked') ? 'true' : 'false'
        };
        if (saveDialog) {
            saveDialog(trendConfiguration, configurationJson);
        }
        localStorage.setItem(trendLocalStorageId, JSON.stringify(configurationJson));
    });

    trendConfiguration.on('keypress', function (e) {
        if (e.which === 13) {
            jQuery3(saveButton).click();
        }
    });
}
