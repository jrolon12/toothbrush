(function() {

    angular
        .module('app')
        .controller('ViewController', ViewController);

    ViewController.$inject = ['$state', '$window', 'ViewService'];

    function ViewController($state, $window, ViewService) {
        var vm = this;
        vm.jobId = undefined;
        vm.jobView = undefined;
        vm.linkedinUrl = undefined;
        vm.Navigate = navigate;

        function navigate(route) {
            if(!route) return;
            $state.go(route);
        }

        activate();

        function activate() {
            setUp();
        }

        function setUp() {
            var id = $state.params.id || undefined;
            setJobId(id);
            getJob();
        }

        function getJob() {
            ViewService.GetJob(getJobId()).then(function(data) {
                vm.jobView = data;
                setTweetThisJobUrl(vm.jobView);
                vm.linkedinUrl = getLinkedinUrl(vm.jobView);
            });
        }

        function setJobId(id) {
            vm.jobId = id;
        }

        function getJobId() {
            return vm.jobId;
        }

        function getPageUrl() {
            return encodeURIComponent($window.location.href);
        }

        function getTwitterTweetUrl() {
            return "https://twitter.com/intent/tweet";
        }

        function getLinkedinUrl(obj) {
            var url = encodeURIComponent(getPageUrl());
            var title = encodeURIComponent("IHeartRemoteWork");
            var source = encodeURIComponent("IHeartRemoteWork.com")
            var summary = encodeURIComponent(obj.companyname + "is now hiring a" + obj.jobtitle);

            return "https://www.linkedin.com/shareArticle?mini=true&url=" + url + "&title="
                + title + "&summary=" + summary + "&source=" + source;
        }

        function getTwitterTweetRelated() {
            return "?related=" + encodeURIComponent("iheartremotework,glicho_");
        }

        function getTwitterTweetText(value) {
            return "&text=" + encodeURIComponent(value.companyname + " is now hiring a " + value.jobtitle + "!");
        }

        function setTweetThisJobUrl(job) {
            var twitterTweetDomain = getTwitterTweetUrl();
            var related = getTwitterTweetRelated();
            var text = getTwitterTweetText(job);
            var url = "&url=" + getPageUrl();

            vm.twitterTweetUrl = twitterTweetDomain + related + text + url;
        }
    }
})();