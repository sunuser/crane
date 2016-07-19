(function () {
    'use strict';
    angular.module('app.node')
        .factory('nodeBackend', nodeBackend);


    /* @ngInject */
    function nodeBackend(gHttp) {
        return {
            listNodes: listNodes,
            getNode: getNode,
            handleNode: handleNode,
            getLeaderNode: getLeaderNode,
            createVolume: createVolume,
            listVolumes: listVolumes,
            deleteVolume: deleteVolume,
            listImages: listImages,
            getImage: getImage,
            getImageHistory: getImageHistory,
            listContainers: listContainers,
            getContainer: getContainer,
            removeContainer: removeContainer,
            killContainer: killContainer,
            diffContainer: diffContainer,
            listNetworks: listNetworks,
            getNetwork: getNetwork,
            createNetwork: createNetwork
        };

        function listNodes(params, loading) {
            return gHttp.Resource('node.nodes').get({params: params, "loading": loading});
        }

        function handleNode(nodeId, data, type) {
            if (data && data.Spec) {
                data.Spec.Availability = type
            }

            return gHttp.Resource('node.node', {node_id: nodeId}).patch(data);
        }

        function getNode(nodeId) {
            return gHttp.Resource('node.nodeInfo', {node_id: nodeId}).get();
        }

        function getLeaderNode() {
            return gHttp.Resource('node.leader').get();
        }

        function createVolume(data, nodeId, form) {
            return gHttp.Resource('node.volumes', {node_id: nodeId}).post(data, {form: form});
        }

        function listVolumes(nodeId) {
            return gHttp.Resource('node.volumes', {node_id: nodeId}).get();
        }

        function deleteVolume(nodeId, name) {
            //name == id, so use name to replace id
            return gHttp.Resource('node.volume', {node_id: nodeId, volume_id: name}).delete();
        }

        function listImages(nodeId, params, loading) {
            return gHttp.Resource('node.images', {node_id: nodeId}).get({params: params, "loading": loading});
        }

        function getImage(nodeId, imageId) {
            return gHttp.Resource('node.image', {node_id: nodeId, image_id: imageId}).get();
        }

        function getImageHistory(nodeId, imageId) {
            return gHttp.Resource('node.imageHistory', {node_id: nodeId, image_id: imageId}).get();
        }

        function listContainers(nodeId) {
            return gHttp.Resource('node.containers', {node_id: nodeId}).get();
        }

        function getContainer(nodeId, containerId) {
            return gHttp.Resource('node.container', {node_id: nodeId, container_id: containerId}).get();
        }

        function removeContainer(nodeId, containerId) {
            var data = {
                method: 'rm'
            };

            return gHttp.Resource('node.container', {node_id: nodeId, container_id: containerId}).delete({data: data});
        }

        function killContainer(nodeId, containerId) {
            var data = {
                method: 'kill'
            };

            return gHttp.Resource('node.container', {node_id: nodeId, container_id: containerId}).delete({data: data});
        }

        function diffContainer(nodeId, containerId) {
            return gHttp.Resource('node.containerDiff', {node_id: nodeId, container_id: containerId}).get();
        }

        function listNetworks(nodeId) {
            return gHttp.Resource('node.networks', {node_id: nodeId}).get();
        }

        function getNetwork(nodeId, networkId) {
            return gHttp.Resource('node.network', {node_id: nodeId, network_id: networkId}).get();
        }

        function createNetwork(data, nodeId, form) {
            return gHttp.Resource('node.networks', {node_id: nodeId}).post(data, {form: form});
        }
    }
})();